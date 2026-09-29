/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0E14', // O fundo quase preto da imagem
        surface: '#151921',    // A cor dos painéis e cards
        primary: '#6366F1',    // O roxo vibrante do botão Analyze
        success: '#10B981',    // Verde do Positive Sentiment
        warning: '#EAB308',    // Amarelo do Neutral Sentiment
        danger: '#EF4444',     // Vermelho do Negative Sentiment
      }
    },
  },
  plugins: [],
}