# BioLingo - Plataforma de Bioacústica e IA para Conservação da Biodiversidade

![BioLingo Logo](https://img.shields.io/badge/BioLingo-v1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-MVP-yellow)

## Descricao do Projeto

**BioLingo** e uma plataforma web robusta que combina **bioacústica**, **inteligência artificial** e **ciência cidada** para identificação, análise e conservação de espécies de animais em Angola. Utilizando modelos de machine learning avancados, a plataforma permite que qualquer pessoa grave sons de animais e receba identificações automáticas de espécies e tipos de vocalização, contribuindo para o monitoramento da biodiversidade e a conservação de espécies ameaçadas.

### Missão
Democratizar o acesso a ferramentas de bioacústica e IA para pesquisadores, conservacionistas e cidadaos interessados em proteger a biodiversidade angolana.

### Visão
Tornar-se a plataforma de referência para monitoramento bioacústico de espécies em Angola, gerando dados científicos de qualidade para pesquisa e conservação.

---

## Funcionalidades Principais

### Para Utilizadores Comuns
- **Gravacao de Audio**: Grave sons de animais diretamente da aplicacao web
- **Identificacao Automatica**: Modelos de ML identificam especies com alta precisao
- **Interpretacao de Vocalizacoes**: Classifica tipos de som (alarme, acasalamento, territorial, etc)
- **Mapa Interativo**: Visualize a distribuicao de especies em tempo real
- **Ciencia Cidada**: Contribua para pesquisa validando e compartilhando dados

### Para Pesquisadores
- **Acesso a Base de Dados**: Milhares de gravacoes bioacústicas catalogadas
- **Ferramentas de Analise**: Filtros avancados por especies, localizacao, data
- **Exportacao de Dados**: Baixe dados em formatos padrao (CSV, JSON)
- **API Publica**: Integre dados do BioLingo em suas pesquisas

### Para Gestores de Areas Protegidas
- **Monitoramento Continuo**: Acompanhe a saúde do ecossistema em tempo real
- **Alertas Automaticos**: Deteccao de atividades suspeitas ou especies raras
- **Relatorios de Saude**: Gere relatorios sobre biodiversidade das areas
- **Deteccao de Caça Furtiva**: Identifique atividades ilegais

---

## Tecnologias e Ferramentas Utilizadas

| Tecnologia | Uso (%) | Descricao |
|---|---|---|
| **React 19** | 100% | Framework frontend moderno com TypeScript |
| **TypeScript** | 100% | Tipagem estatica para seguranca de tipos |
| **Tailwind CSS 4** | 100% | Framework CSS para design responsivo |
| **Express.js** | 100% | Framework backend Node.js |
| **tRPC 11** | 100% | RPC type-safe para comunicacao frontend-backend |
| **MySQL** | 100% | Banco de dados relacional |
| **Drizzle ORM** | 100% | ORM moderno e type-safe |
| **Manus OAuth** | 100% | Autenticacao segura |
| **Google Cloud Run** | 100% | Deployment serverless |
| **Google Cloud Storage** | 100% | Armazenamento de arquivos de audio |
| **shadcn/ui** | 100% | Componentes UI reutilizaveis |
| **Vite** | 100% | Build tool rapido para frontend |
| **Python (ML)** | 100% | Modelos de machine learning |
| **TensorFlow/PyTorch** | 100% | Frameworks para deep learning |

---

## Estrutura do Projeto

```
biolingo-web/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── pages/                  # Paginas da aplicacao
│   │   │   ├── Home.tsx            # Landing page com hero section
│   │   │   ├── Dashboard.tsx       # Dashboard do utilizador autenticado
│   │   │   ├── Record.tsx          # Interface de gravacao de audio
│   │   │   ├── Observations.tsx    # Criacao de observacoes
│   │   │   ├── Explore.tsx         # Exploracao de dados e mapa
│   │   │   └── NotFound.tsx        # Pagina 404
│   │   ├── components/             # Componentes reutilizaveis
│   │   │   ├── ui/                 # Componentes shadcn/ui
│   │   │   ├── DashboardLayout.tsx # Layout para dashboard
│   │   │   └── ErrorBoundary.tsx   # Tratamento de erros
│   │   ├── contexts/               # React contexts
│   │   │   └── ThemeContext.tsx    # Gerenciamento de tema
│   │   ├── hooks/                  # Custom hooks
│   │   │   └── useAuth.ts          # Hook de autenticacao
│   │   ├── lib/                    # Utilidades
│   │   │   └── trpc.ts             # Cliente tRPC
│   │   ├── App.tsx                 # Roteamento principal
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Estilos globais
│   └── public/                     # Assets estaticos
│       ├── logo.svg
│       └── favicon.ico
├── server/                          # Backend Express
│   ├── db.ts                       # Query helpers para database
│   ├── routers.ts                  # tRPC routers e procedimentos
│   ├── _core/                      # Framework internals
│   │   ├── context.ts              # Contexto de requisicao
│   │   ├── trpc.ts                 # Configuracao tRPC
│   │   ├── env.ts                  # Variaveis de ambiente
│   │   ├── auth.ts                 # Logica de autenticacao
│   │   ├── llm.ts                  # Integracao com LLM
│   │   ├── imageGeneration.ts      # Geracao de imagens
│   │   └── voiceTranscription.ts   # Transcricao de audio
│   └── storage.ts                  # Helpers de armazenamento S3
├── drizzle/                         # Database schema
│   ├── schema.ts                   # Definicoes de tabelas
│   └── migrations/                 # SQL migrations
├── storage/                         # S3 helpers
├── shared/                          # Codigo compartilhado
│   └── const.ts                    # Constantes globais
├── ML_INTEGRATION.md                # Guia de integracao com ML
├── ARCHITECTURE.md                  # Arquitetura tecnica
├── README_BIOLINGO.md               # Documentacao adicional
├── package.json                     # Dependencias do projeto
├── tsconfig.json                    # Configuracao TypeScript
├── vite.config.ts                   # Configuracao Vite
└── drizzle.config.ts                # Configuracao Drizzle
```

---

## Como Configurar o Projeto

### Prerequisitos
- Node.js 18+ instalado
- pnpm (ou npm/yarn)
- Git
- Conta Google Cloud (para deployment)

### Passo 1: Clonar o Repositorio
```bash
git clone https://github.com/biolingo/biolingo-web.git
cd biolingo-web
```

### Passo 2: Criar Ambiente Virtual
```bash
# Criar arquivo .env.local
cp .env.example .env.local

# Editar .env.local com suas credenciais
# DATABASE_URL=mysql://user:password@host/database
# VITE_APP_ID=seu-app-id
# JWT_SECRET=seu-jwt-secret
```

### Passo 3: Instalar Dependencias
```bash
pnpm install
```

### Passo 4: Inicializar Banco de Dados
```bash
pnpm db:push
```

### Passo 5: Iniciar Servidor de Desenvolvimento
```bash
pnpm dev
```

Acesse `http://localhost:3000` no navegador.

---

## Comandos Uteis

### Desenvolvimento
```bash
pnpm dev              # Iniciar servidor de desenvolvimento
pnpm build            # Build para producao
pnpm preview          # Preview do build
pnpm type-check       # Verificar tipos TypeScript
```

### Database
```bash
pnpm db:push          # Aplicar migracao
pnpm db:studio        # Abrir Drizzle Studio (GUI)
pnpm db:generate      # Gerar migracao
pnpm db:migrate       # Executar migracao
```

### Linting e Formatting
```bash
pnpm lint             # Executar ESLint
pnpm format           # Formatar com Prettier
pnpm lint:fix         # Corrigir erros de linting
```

### Testing
```bash
pnpm test             # Executar testes
pnpm test:watch       # Modo watch
pnpm test:coverage    # Cobertura de testes
```

---

## Fluxo de Dados

### 1. Autenticacao
```
Utilizador -> Portal de Login (Manus OAuth)
           -> Callback Handler (/api/oauth/callback)
           -> Session Cookie (JWT)
           -> Frontend (useAuth hook)
```

### 2. Submissao de Gravacao
```
Utilizador (Frontend)
    |
    v
Gravacao de Audio (Microfone)
    |
    v
Upload para Cloud Storage (storagePut)
    |
    v
tRPC Mutation (recordings.create)
    |
    v
Backend (Express/Node.js)
    |
    +---> Salvar metadados no DB
    |
    +---> Enviar para ML Service
    |
    v
ML Service (Cloud Run)
    |
    +---> Preprocessamento de audio
    +---> Extracao de features (espectrogramas, MFCCs)
    +---> Inferencia (Classificador de Especies + Vocalizacao)
    |
    v
Resultados retornam ao Backend
    |
    v
Salvar classificationResults no DB
    |
    v
Frontend atualiza com resultados
```

### 3. Exploracao de Dados
```
Utilizador (Frontend)
    |
    v
tRPC Query (species.list, observations.list, etc)
    |
    v
Backend (Express/Node.js)
    |
    v
Database Query (Drizzle ORM)
    |
    v
Retornar dados ao Frontend
    |
    v
Renderizar em componentes React
```

---

## Modelos de Dados

### Users
Tabela de utilizadores com informacoes de autenticacao e perfil.

### Species
Catalogo de especies de animais com informacoes cientificas e status de conservacao.

### AudioRecordings
Gravacoes de audio enviadas pelos utilizadores com metadados de localizacao e qualidade.

### ClassificationResults
Resultados de classificacao de ML para cada gravacao.

### Observations
Observacoes de utilizadores sobre avistamentos de especies.

### VocalizationTypes
Tipos de vocalizacao (alarme, acasalamento, territorial, social, contacto).

Para mais detalhes, ver [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Testes Automatizados

O projeto possui testes automatizados para backend, frontend e integracao. Para rodar todos os testes:

```bash
pnpm test
```

### Cobertura de Testes
- Backend: Procedimentos tRPC, query helpers
- Frontend: Componentes React, hooks
- Integracao: Fluxos end-to-end

---

## Integracao com Machine Learning

O servico de ML e responsavel por:
1. **Preprocessamento de Audio**: Normalizacao, remocao de ruido
2. **Extracao de Features**: Espectrogramas, MFCCs, zero-crossing rate
3. **Inferencia**: Classificacao de especies e vocalizacoes
4. **Retorno de Predicoes**: Scores de confianca e top-K predictions

Para detalhes tecnicos, ver [ML_INTEGRATION.md](./ML_INTEGRATION.md)

---

## Deployment

### Staging
```bash
git push origin develop
# Deploy automatico para staging.biolingo.ao
```

### Production
```bash
git tag v1.0.0
git push origin v1.0.0
# Deploy manual para www.biolingo.ao
```

### Ambientes
- **Development**: Local com hot reload
- **Staging**: Cloud Run (staging project)
- **Production**: Cloud Run (production project)

---

## Seguranca

### Autenticacao
- OAuth 2.0 via Manus
- Session cookies com JWT
- HTTPS/TLS em transito

### Autorizacao
- `publicProcedure`: Acessivel a todos
- `protectedProcedure`: Requer autenticacao
- `adminProcedure`: Requer role admin

### Validacao
- Zod schemas para validacao de inputs
- Sanitizacao de dados no backend
- CORS configurado apropriadamente

### Storage
- URLs assinadas para acesso a arquivos
- Versionamento de arquivos em Cloud Storage
- Backup automatico

---

## Performance

### Otimizacoes
- **Caching**: Redis para cache de queries frequentes
- **CDN**: Cloudflare para assets estaticos
- **Lazy Loading**: Code splitting com Vite
- **Database Indexing**: Indices em colunas frequentemente consultadas
- **Batch Processing**: Processamento em lote de audios

### Metricas de Performance
- Time to First Byte (TTFB): < 200ms
- First Contentful Paint (FCP): < 1s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

---

## Escalabilidade

### Horizontal Scaling
- Cloud Run com autoscaling (0-50 instancias)
- Database read replicas para distribuir carga
- Redis serverless para cache distribuido

### Limites Atuais (MVP)
- 50 especies de aves
- ~1000 gravacoes/dia esperadas
- ~500 utilizadores simultaneos

### Expansao Futura
- Multi-regiao deployment (EU + Africa)
- Suporte para mamiferos, anfibios, repteis
- Rede de sensores bioacusticos em parques nacionais

---

## Monitoramento

### Logs
- Google Cloud Logging
- Structured logging com JSON
- Alertas para erros criticos

### Metricas
- Google Cloud Monitoring
- Grafana dashboards
- Alertas de SLA

### Rastreamento
- Sentry para error tracking
- Distributed tracing com OpenTelemetry

---

## Recomendacoes Finais

1. **Limpe o cache do navegador** se notar problemas de carregamento de assets
2. **Certifique-se de que todas as variaveis de ambiente estao configuradas** antes de iniciar
3. **Use HTTPS em producao** para seguranca de dados
4. **Monitore os logs regularmente** para detectar problemas
5. **Realize backups regulares** da base de dados

---

## Roadmap

### MVP (Q1 2026)
- [x] Plataforma web basica
- [x] Autenticacao OAuth
- [x] Upload de gravacoes
- [ ] Integracao com modelo de ML
- [ ] Dashboard de utilizador
- [ ] Mapa de distribuicao de especies

### Phase 2 (Q2 2026)
- [ ] Aplicacao movel (React Native)
- [ ] Offline recording capability
- [ ] Ciencia cidada (validacao de dados)
- [ ] Relatorios e analytics

### Phase 3 (Q3 2026)
- [ ] Expansao para mamiferos
- [ ] Rede de sensores bioacusticos
- [ ] API publica para pesquisadores
- [ ] Integracao com GBIF

---

## Contacto e Suporte - Brevemente

- **Email**: support@biolingo.ao
- **Website**: https://www.biolingo.ao
- **GitHub Issues**: https://github.com/biolingo/biolingo-web/issues

---

## Contribuindo

Adoramos contribuicoes! Para contribuir:

1. Fork o repositorio
2. Criar branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudancas (`git commit -m 'Add some AmazingFeature'`)
4. Push para o branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Diretrizes de Contribuicao
- Siga o estilo de codigo do projeto
- Adicione testes para novas funcionalidades
- Atualize a documentacao conforme necessario
- Mantenha commits atomicos e com mensagens descritivas

---

## Licenca

Este projeto esta licenciado sob a **MIT License** - ver arquivo [LICENSE](./LICENSE) para detalhes.

---

## Agradecimentos

Desenvolvido pelo **Grupo 14** em colaboracao com:
- Universidades angolanas
- Institutos de pesquisa
- ONGs de conservacao
- Comunidades locais
- Voluntarios da ciencia cidada

---

## Autores

- **Grupo 14** - Desenvolvimento inicial
- **Comunidade BioLingo** - Feedback e contribuicoes

---

## Changelog

### v1.0.0 (Outubro 2025)
- Lancamento do MVP
- Plataforma web completa
- Autenticacao OAuth
- Dashboard de utilizador
- Integracao com modelos de ML (em progresso)

---

**Ultima atualizacao**: Outubro 2025  
**Status**: MVP - Pronto para desenvolvimento  
**Versao**: 1.0.0

---

## Duvidas Frequentes (FAQ)

**P: Como posso contribuir com dados de audio?**  
R: Registre-se na plataforma, acesse a secao "Gravar Som" e envie suas gravacoes de audio.

**P: Meus dados sao privados?**  
R: Sim, seus dados pessoais sao privados. Voce pode escolher se suas gravacoes sao publicas ou privadas.

**P: Como funciona o modelo de ML?**  
R: O modelo utiliza redes neurais profundas treinadas em milhares de espectrogramas de audio.

**P: Qual e o custo?**  
R: A plataforma e gratuita para utilizadores comuns. Planos premium estao em desenvolvimento.

---

Para mais informações brevemente, visite [www.biolingo.ao](https://www.biolingo.ao) ou abra uma issue no GitHub.
