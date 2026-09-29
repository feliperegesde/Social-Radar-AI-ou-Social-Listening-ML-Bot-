# 📊 Social Radar AI: NLP Sentiment Analysis & Alert Automation

![Python](https://img.shields.io/badge/Python-3.12+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.112.0-009688.svg?logo=fastapi)
![Streamlit](https://img.shields.io/badge/Streamlit-1.37.0-FF4B4B.svg?logo=streamlit)
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.5.2-F7931E.svg?logo=scikit-learn)
![Pandas](https://img.shields.io/badge/Pandas-2.2.2-150458.svg?logo=pandas)

## 📌 Sobre o Projeto
O **Social Radar AI** é um pipeline *end-to-end* de Machine Learning desenvolvido para realizar monitoramento ativo (Social Listening) de marcas, produtos ou termos na web. O sistema coleta dados textuais, aplica modelos de Processamento de Linguagem Natural (NLP) para classificação de sentimentos e automatiza o disparo de alertas em tempo real caso o volume de críticas ultrapasse um limiar de segurança.

Este projeto demonstra a integração completa de uma solução de dados: desde o script de coleta e pipeline de Machine Learning, até a construção de uma API robusta e um dashboard interativo.

## 🚀 Funcionalidades Principais
- **Análise de Sentimento com NLP:** Utiliza `TfidfVectorizer` e `LogisticRegression` para classificar menções em *Positivo*, *Neutro* e *Negativo*.
- **API RESTful Alta Performance:** Backend estruturado com **FastAPI**, servindo o modelo de ML para inferência rápida.
- **Automação de Alertas:** Integração via Webhooks e APIs nativas para disparo de alertas preventivos no **Telegram** e **Discord**.
- **Dashboard Interativo:** Interface front-end desenvolvida em **Streamlit** para visualização de métricas e exploração das inferências.
- **Estrutura Modular:** Arquitetura desacoplada (Frontend / Backend) pronta para escalabilidade e deploy em nuvem.

## 🛠️ Stack Tecnológica
- **Machine Learning & Dados:** Scikit-Learn, Pandas, NumPy, Joblib, NLTK.
- **Backend & Automação:** FastAPI, Uvicorn, Pydantic, Python `requests`, Playwright (preparado para scraping avançado).
- **Frontend:** Streamlit.

## 📂 Arquitetura do Projeto
```text
social-listening-bot/
├── backend/
│   ├── models/                # Modelos treinados (.pkl salvos com joblib)
│   ├── src/
│   │   ├── main.py            # API FastAPI (Rotas e inicialização)
│   │   ├── model.py           # Pipeline de NLP e predição
│   │   ├── preprocessor.py    # Limpeza e normalização de texto
│   │   ├── collector.py       # Módulo de scraping/simulação de coleta
│   │   └── notifier.py        # Integração com Telegram e Discord
│   ├── .env.example           # Variáveis de ambiente
│   └── requirements.txt       # Dependências do backend
│
├── frontend/
│   └── app.py                 # Dashboard Streamlit
│
└── README.md