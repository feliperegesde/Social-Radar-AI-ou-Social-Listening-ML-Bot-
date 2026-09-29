import os
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from src.preprocessor import TextPreprocessor

class SentimentModel:
    def __init__(self, model_path="models/sentiment_pipeline.pkl"):
        self.model_path = model_path
        self.pipeline = self._load_or_create_model()

    def _load_or_create_model(self):
        if os.path.exists(self.model_path):
            return joblib.load(self.model_path)
        else:
            # Criando um modelo baseline robusto caso não exista arquivo treinado
            os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
            return self._train_initial_model()

    def _train_initial_model(self):
        # Dataset sintético inicial para bootstrap do modelo
        data = {
            "text": [
                "odiei esse produto pessimo horrivel nao recomendo",
                "produto ruim quebra facil dinheiro jogado fora",
                "nao gostei do atendimento pessima experiencia",
                "produto razoavel cumpre o que promete mas nada demais",
                "mais ou menos achei medio",
                "estou neutro quanto a isso",
                "perfeito adorei excelente qualidade recomendo muito",
                "maravilhoso melhor compra que ja fiz estou muito feliz",
                "fantastico atendimento nota dez parabens"
            ],
            "label": [
                "Negativo", "Negativo", "Negativo",
                "Neutro", "Neutro", "Neutro",
                "Positivo", "Positivo", "Positivo"
            ]
        }
        df = pd.DataFrame(data)
        
        # Pré-processar textos
        df["clean_text"] = df["text"].apply(TextPreprocessor.clean_text)

        pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(ngram_range=(1, 2), max_features=5000)),
            ('clf', LogisticRegression())
        ])

        pipeline.fit(df["clean_text"], df["label"])
        
        # Salvar modelo treinado
        joblib.dump(pipeline, self.model_path)
        return pipeline

    def predict(self, texts: list[str]) -> list[dict]:
        cleaned_texts = [TextPreprocessor.clean_text(t) for t in texts]
        predictions = self.pipeline.predict(cleaned_texts)
        probabilities = self.pipeline.predict_proba(cleaned_texts)
        
        results = []
        for text, pred, proba in zip(texts, predictions, probabilities):
            confidence = float(max(proba))
            results.append({
                "text": text,
                "sentiment": pred,
                "confidence": round(confidence, 4)
            })
        return results