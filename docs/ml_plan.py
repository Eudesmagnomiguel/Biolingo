# -*- coding: utf-8 -*-
"""
Ótimo — vamos construir um **plano prático e executável** para criar um modelo de Machine Learning para o *BioLingo*. Vou assumir que o objetivo do BioLingo é trabalhar com **texto (NLP)** — por exemplo: classificação de textos, extração de entidades biomédicas, normalização/explicação de termos, ou busca semântica. Se o teu objetivo for outro (áudio, imagem, etc.) ainda serve como guia geral.

# 1) Defina claramente o problema

Escolhe UMA tarefa inicial (exemplos):

* **Classificação**: categorizar textos (p.ex. tipo de documento, intenção do usuário).
* **NER (Extração de entidades)**: extrair genes, doenças, medicamentos.
* **Normalização / Simplificação**: converter termos técnicos em linguagem simples.
* **Busca semântica / QA**: responder perguntas usando base de conhecimento.

Vou partir do exemplo prático: **classificador de intenção + busca semântica** (duas pilhas que combinam bem).

# 2) Colecção e rotulagem de dados

* Fontes: documentos internos, manuais, logs de chat, artigos, FAQs, anotações de especialistas.
* Formato: CSV/JSON com colunas como `id, text, label, meta`.
* Tamanho: comece com algumas centenas de exemplos por classe (baseline); para transformer, 1k–10k por classe melhora muito.
* Rotulagem: use etiquetas consistentes; documenta um guia de rotulagem; considera *active learning* para rotular apenas exemplos úteis.
* Privacidade: remove dados sensíveis; obedece às leis locais (Angola) e à política de privacidade.

# 3) Pipeline de pré-processamento

* Limpeza mínima: remoção de espaços, normalização de Unicode, preserva acentos (importante para PT).
* Tokenização: use o tokenizer do modelo (p.ex. BERT tokenizer) — evita tokenização manual agressiva.
* Balanceamento: oversample/undersample ou usar weights no loss se classes desbalanceadas.
* Splits: treino / validação / teste (p.ex. 80/10/10) com stratificação.

# 4) Baseline rápido (rápido a implementar)

Implementa um baseline clássico para ter referência:

* TF-IDF (scikit-learn) + Logistic Regression / SVM.
* Métricas: accuracy, precision, recall, F1 (por classe).
  Exemplo mínimo (scikit-learn):

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.2, stratify=labels)
# pipe = Pipeline([
#     ('tfidf', TfidfVectorizer(ngram_range=(1,2), max_features=20000)),
#     ('clf', LogisticRegression(max_iter=1000, class_weight='balanced'))
# ])
# pipe.fit(X_train, y_train)
# y_pred = pipe.predict(X_test)
# print(classification_report(y_test, y_pred))
```

Esse baseline serve para medir se um modelo complexo justifica-se.

# 5) Melhor modelo: fine-tune Transformer (recomendado para Português)

* Modelos: usar um modelo pré-treinado em português (p.ex. BERTimbau, mBERT, or XLM-R). Fine-tune para classificação ou NER.
* Framework: Hugging Face Transformers (Trainer) ou PyTorch Lightning.

Exemplo (esqueleto) fine-tuning classificação:

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
import datasets

# model_name = "neuralmind/bert-base-portuguese-cased"  # exemplo
# tokenizer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=num_classes)

# def preprocess(ex):
#     return tokenizer(ex['text'], truncation=True, padding='max_length', max_length=256)

# dataset = datasets.Dataset.from_pandas(df)  # df com 'text' e 'label'
# dataset = dataset.map(preprocess, batched=True)
# dataset = dataset.train_test_split(test_size=0.1, stratify_by_column='label')

# training_args = TrainingArguments(
#     output_dir="out",
#     evaluation_strategy="epoch",
#     per_device_train_batch_size=8,
#     per_device_eval_batch_size=16,
#     num_train_epochs=3,
#     save_total_limit=2,
#     load_best_model_at_end=True,
#     metric_for_best_model="f1",
# )

# def compute_metrics(pred):
#     from sklearn.metrics import f1_score, precision_score, recall_score
#     labels = pred.label_ids
#     preds = pred.predictions.argmax(-1)
#     return {
#         'f1': f1_score(labels, preds, average='weighted'),
#         'precision': precision_score(labels, preds, average='weighted'),
#         'recall': recall_score(labels, preds, average='weighted'),
#     }

# trainer = Trainer(model=model, args=training_args, train_dataset=dataset['train'], eval_dataset=dataset['test'], compute_metrics=compute_metrics)
# trainer.train()
```

# 6) Busca semântica / embeddings (útil para BioLingo)

* Gere embeddings com modelos Sentence Transformers (`sentence-transformers`) e indexe num FAISS / Milvus / Pinecone.
* Workflow: texto → embedding → indexação → busca por similaridade.
* Isso permite responder perguntas com recuperação de trechos relevantes.

Exemplo simplificado:

```python
from sentence_transformers import SentenceTransformer
import faiss
# model = SentenceTransformer('all-MiniLM-L6-v2')  # multilingual/lightweight
# embs = model.encode(list_of_documents, convert_to_numpy=True)
# index = faiss.IndexFlatL2(embs.shape[1])
# index.add(embs)
# # pesquisa
# q_emb = model.encode([query])
# D,I = index.search(q_emb, k=5)
```

# 7) Avaliação e métricas

* Classificação: accuracy, precision/recall/F1 (macro + weighted), matriz de confusão.
* NER: precision/recall/F1 por entidade (span-level).
* Busca/QA: MRR, MAP, NDCG, Exact Match / F1 para QA.
* Testes humanos: revisão por especialistas (importante em domínio biomédico).

# 8) Deploy e integração

* Empacota modelo em API (FastAPI + Uvicorn), cria endpoints `/predict`, `/embed`, `/search`.
* Containeriza com Docker; usa Gunicorn/Uvicorn para produção.
* Se recursos limitados, oferece:

  * **Serviço leve**: TF-IDF baseline em CPU.
  * **Serviço pesado**: transformer em GPU (cloud) ou quantizado para CPU (ONNX + quantização).

# 9) Monitoramento e manutenção

* Log de previsões + drift detection (monitorar mudanças nas distribuições).
* Pipeline de re-treinamento: agendamento mensal ou baseado em acúmulo de rotulagens.
* Avaliação contínua com dados reais e feedback dos utilizadores.

# 10) Técnicas úteis e dicas práticas

* **Transfer learning**: fine-tune um modelo já em PT em vez de treinar do zero.
* **Data augmentation**: back-translation (pt↔pt via variações), substituição de sinónimos.
* **Class weights / focal loss** para classes raras.
* **Early stopping** para evitar overfitting.
* **Explainability**: SHAP/LIME ou attention visualization para justificar previsões (importante em domínios sensíveis).
* **Active learning**: pede rótulos para exemplos onde o modelo tem baixa confiança.

# 11) Exemplo de roadmap (curto prazo)

1. Reunir e formatar dataset (2 semanas).
2. Baseline TF-IDF + Logistic Regression (2–3 dias).
3. Fine-tune transformer para classificação (1–2 semanas).
4. Criar serviço de embeddings + prova de conceito de busca (1 semana).
5. Integrar numa API simples + Docker (3–5 dias).
6. Teste com utilizadores e iterações (contínuo).

# 12) Recursos e ferramentas recomendadas

* Python, pandas, scikit-learn, Hugging Face Transformers, datasets, sentence-transformers, faiss, FastAPI, Docker.
* Se precisares, eu posso gerar:

  * scripts completos de treino,
  * `Dockerfile` + `FastAPI` example,
  * template de pipeline de rotulagem,
  * ou um notebook passo-a-passo com os códigos de baseline e fine-tune.
"""
pass
