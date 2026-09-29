from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.collector import DataCollector
from src.model import SentimentModel
from src.notifier import AlertNotifier

app = FastAPI(
    title="Social Listening ML & Automation API",
    version="1.0.0",
    description="API de backend para monitoramento de sentimento, NLP e automação de alertas."
)

sentiment_model = SentimentModel()

class MonitorRequest(BaseModel):
    query: str
    limit: int = 10

@app.get("/")
def read_root():
    return {"status": "online", "service": "Social Listening Bot Backend"}

@app.post("/api/v1/analyze")
def analyze_mentions(payload: MonitorRequest):
    try:
        # 1. Coletar menções
        raw_texts = DataCollector.fetch_mentions(payload.query, payload.limit)
        
        # 2. Processar e classificar com o Modelo de ML
        analysis_results = sentiment_model.predict(raw_texts)
        
        # 3. Agregar estatísticas
        sentiments_count = {"Positivo": 0, "Neutro": 0, "Negativo": 0}
        for item in analysis_results:
            sentiments_count[item["sentiment"]] += 1
            
        total = len(analysis_results)
        negative_ratio = (sentiments_count["Negativo"] / total) if total > 0 else 0
        
       
        # 4. Verificar regra de alerta automatizado
        alert_sent = False
        if sentiments_count["Negativo"] >= 3:  # Limiar de exemplo
            alert_msg = f"Detectado pico de {sentiments_count['Negativo']} menções negativas para a query: *{payload.query}*."
            
            # Tenta enviar para o Discord e/ou Telegram se configurados
            discord_ok = AlertNotifier.send_discord_alert(alert_msg)
            telegram_ok = AlertNotifier.send_telegram_alert(alert_msg)
            
            alert_sent = discord_ok or telegram_ok

        return {
            "query": payload.query,
            "total_analyzed": total,
            "summary_counts": sentiments_count,
            "negative_ratio": round(negative_ratio, 2),
            "alert_triggered": alert_sent,
            "results": analysis_results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))