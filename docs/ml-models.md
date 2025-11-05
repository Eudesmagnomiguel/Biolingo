# Estratégias de Modelos de Machine Learning para Bioacústica

Aqui estão as principais estratégias e modelos a serem considerados para a análise de áudio no BioLingo:

### a. Modelos de Classificação de Áudio

*   **CNNs para classificação de espectrogramas:** Redes Neurais Convolucionais são altamente eficazes para tratar espectrogramas (representações visuais do áudio) como imagens. Esta é a abordagem padrão e mais robusta para a classificação de sons de animais.

### b. Otimização com Dados Limitados

*   **Transfer learning (AudioSet, BirdCLEF → dados angolanos):** Utilizar modelos pré-treinados em grandes datasets de áudio, como AudioSet ou os dados da competição BirdCLEF. O fine-tuning destes modelos com dados específicos de Angola pode acelerar o treino e melhorar significativamente a performance, mesmo com um volume de dados menor.

### c. Análise de Sequências Temporais

*   **RNN/LSTM para sequências temporais:** Redes Neurais Recorrentes (RNNs) e Long Short-Term Memory (LSTMs) são úteis para analisar as características temporais dos cantos das aves e outras vocalizações, capturando padrões que podem ser perdidos em análises estáticas de espectrogramas.

### d. Métricas de Avaliação

Para avaliar a performance dos modelos de forma justa, especialmente com datasets desbalanceados (comuns em bioacústica), as seguintes métricas são cruciais:

*   **F1-score (ponderado ou macro):** Uma média harmónica entre precisão e recall, fornecendo uma medida de robustez geral.
*   **Recall por classe:** Essencial para garantir que o modelo não está a ignorar espécies raras ou com poucos exemplos.
*   **Balanced Accuracy:** A média do recall obtido em cada classe, ideal para problemas de classificação desbalanceados.

### e. Plano de Validação

Uma estratégia de validação robusta é fundamental para garantir que o modelo generalize bem para novos dados.

*   **Divisão treino/validação/teste:** Uma divisão estratificada (e.g., 70/15/15) para garantir que a proporção de classes seja mantida em todos os conjuntos.
*   **Backtesting temporal:** Se os dados são recolhidos ao longo do tempo, o modelo deve ser treinado com dados mais antigos e testado nos mais recentes para simular um cenário de produção real e avaliar a sua degradação ao longo do tempo (model drift).
