import os
import requests
from dotenv import load_dotenv

load_dotenv()

class AlertNotifier:
    @staticmethod
    def send_discord_alert(message: str) -> bool:
        webhook_url = os.getenv("DISCORD_WEBHOOK_URL")
        if not webhook_url:
            print("Webhook do Discord não configurado.")
            return False
        
        payload = {"content": f"🚨 **ALERTA SOCIAL LISTENING** 🚨\n{message}"}
        try:
            response = requests.post(webhook_url, json=payload)
            return response.status_code == 204
        except Exception as e:
            print(f"Erro ao enviar alerta para o Discord: {e}")
            return False

    def send_telegram_alert(message: str) -> bool:
        token = os.getenv("TELEGRAM_BOT_TOKEN")
        chat_id = os.getenv("TELEGRAM_CHAT_ID")
        if not token or not chat_id:
            return False
            
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": f"🚨 *ALERTA SOCIAL LISTENING* 🚨\n{message}",
            "parse_mode": "Markdown"
        }
        try:
            response = requests.post(url, json=payload)
            return response.status_code == 200
        except Exception as e:
            print(f"Erro ao enviar alerta para o Telegram: {e}")
            return False