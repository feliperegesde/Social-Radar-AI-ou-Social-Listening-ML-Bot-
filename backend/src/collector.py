import random
import time

class DataCollector:
    @staticmethod
    def fetch_mentions(query: str, limit: int = 10) -> list[str]:
        """
        Simula a busca de menções recentes na web/redes sociais sobre uma query.
        Pode ser expandido para usar Playwright para raspar um site real.
        """
        simulated_corpus = [
            f"Estou indignado com {query}, o serviço caiu de novo e ninguém resolve!",
            f"Péssima experiência usando {query}, não recomendo para ninguém.",
            f"Alguém mais achou {query} meio lento hoje?",
            f"O sistema {query} está funcionando dentro do esperado.",
            f"Simplesmente incrível o que fizeram em {query}, nota 10!",
            f"Estou amando as novas atualizações de {query}, excelente trabalho!",
            f"Horrível, pior suporte técnico que já vi em {query}.",
            f"Funciona bem, mas faltam algumas melhorias em {query}."
        ]
        
        # Retorna uma amostra simulada baseada no limite solicitado
        collected = random.choices(simulated_corpus, k=min(limit, len(simulated_corpus)))
        return collected