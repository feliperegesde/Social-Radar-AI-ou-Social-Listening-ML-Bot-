import re
import unicodedata

class TextPreprocessor:
    @staticmethod
    def clean_text(text: str) -> str:
        if not isinstance(text, str):
            return ""
        
        # Converter para minúsculas
        text = text.lower()
        
        # Remover URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        
        # Remover menções a usuários (ex: @usuario)
        text = re.sub(r'@\w+', '', text)
        
        # Remover acentos (normalização Unicode)
        nfkd = unicodedata.normalize('NFKD', text)
        text = "".join([c for c in nfkd if not unicodedata.combining(c)])
        
        # Manter apenas letras, números e espaços básicos
        text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)
        
        # Remover espaços extras
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text