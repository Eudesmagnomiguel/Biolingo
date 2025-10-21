Proposta de Ideia

Projecto BioLingo.

**Data de Entrega: 20 de Outubro de 2025**

**Grupo nº 14**

# Índice {#índice .TOC-Heading}

[Sumário Executivo [3](#_Toc211871750)](#_Toc211871750)

[1. Proposta de Ideia [4](#_Toc211871751)](#_Toc211871751)

[1.1. Contexto e Motivação [4](#_Toc211871752)](#_Toc211871752)

[1.2. A Ideia: BioLingo [4](#_Toc211871753)](#_Toc211871753)

[1.3. Visão, Missão e Valores [5](#_Toc211871754)](#_Toc211871754)

[1.4. Objectivos do Projecto [5](#_Toc211871755)](#_Toc211871755)

[1.5. Casos de Uso [6](#_Toc211871756)](#_Toc211871756)

[2. Revisão de Literatura [6](#_Toc211871757)](#_Toc211871757)

[2.1. Bioacústica em África: Estado da Arte
[6](#_Toc211871758)](#_Toc211871758)

[2.2. Comunicação Animal: Fundamentos Científicos
[7](#_Toc211871759)](#_Toc211871759)

[2.3. Inteligência Artificial em Bioacústica
[8](#_Toc211871760)](#_Toc211871760)

[2.4. Aplicações na Conservação [8](#_Toc211871761)](#_Toc211871761)

[2.5. Contexto Angolano: Biodiversidade e Conservação
[9](#_Toc211871762)](#_Toc211871762)

[3. Dados e Fontes de Informação [9](#_Toc211871763)](#_Toc211871763)

[3.1. Bases de Dados Globais Existentes
[9](#_Toc211871764)](#_Toc211871764)

[3.2. APIs Disponíveis [10](#_Toc211871765)](#_Toc211871765)

[3.3. Recolha de Dados Locais em Angola
[10](#_Toc211871766)](#_Toc211871766)

[3.4. Metadados e Anotação [11](#_Toc211871767)](#_Toc211871767)

[4. Tecnologia e Arquitetura [11](#_Toc211871768)](#_Toc211871768)

[4.1. Arquitetura Geral do Sistema [11](#_Toc211871769)](#_Toc211871769)

[4.2. Tecnologias de Processamento de Áudio
[12](#_Toc211871770)](#_Toc211871770)

[4.3. Modelos de Machine Learning [12](#_Toc211871771)](#_Toc211871771)

[4.4. Gestão de Dados e Modelos (MLOps)
[13](#_Toc211871772)](#_Toc211871772)

[4.5. Infraestrutura de Deployment [13](#_Toc211871773)](#_Toc211871773)

[4.6. Considerações de Conectividade para Angola
[13](#_Toc211871774)](#_Toc211871774)

[5. Alinhamento com os Objectivos de Desenvolvimento Sustentável (ODS)
[14](#_Toc211871775)](#_Toc211871775)

[6. Conclusão [15](#_Toc211871776)](#_Toc211871776)

[Referências [16](#_Toc211862245)](#_Toc211862245)

[]{#_Toc211871750 .anchor}Sumário Executivo

Nós, o Grupo nº 14, apresentamos o projecto **BioLingo**, uma plataforma
digital inovadora que utiliza inteligência artificial para decifrar a
comunicação animal, transformando sons da fauna em informações
acessíveis e acionáveis. Com foco específico em Angola, o BioLingo visa
contribuir para a conservação da biodiversidade, educação ambiental,
investigação científica e ecoturismo, alinhando-se com os Objectivos de
Desenvolvimento Sustentável (ODS) das Nações Unidas. Este documento
apresenta a proposta de ideia, a revisão de literatura que fundamenta o
projecto, as fontes de dados disponíveis e a tecnologia necessária para
a sua implementação.

[]{#_Toc211871751 .anchor}1. Proposta de Ideia

[]{#_Toc211871752 .anchor}1.1. Contexto e Motivação

Angola possui uma das biodiversidades mais ricas do continente africano,
com aproximadamente 276 espécies de mamíferos, 265 espécies de aves de
reprodução e 5.185 espécies de plantas superiores. No entanto, esta
riqueza natural enfrenta ameaças significativas, incluindo a caça
furtiva, perda de habitat e os impactos residuais de três décadas de
guerra civil. Segundo a IUCN, cerca de 75% dos animais e plantas
listados na Lista Vermelha em Angola estão classificados como
vulneráveis, ameaçados ou criticamente ameaçados.

Paralelamente, a pesquisa científica em bioacústica em África permanece
limitada, com 74,3% dos autores sendo não-africanos, indicando uma
lacuna crítica em capacidades locais de investigação. Angola está
particularmente subrepresentada neste campo, apesar do seu potencial
imenso.

[]{#_Toc211871753 .anchor}1.2. A Ideia: BioLingo

O **BioLingo** é uma plataforma digital que combina bioacústica e
inteligência artificial para:

1.  **Recolher** sons de animais através de uma aplicação móvel (ciência
    cidadã) e sensores bioacústicos em campo.

2.  **Analisar** automaticamente estes sons utilizando modelos de
    Machine Learning para identificar espécies e interpretar
    vocalizações.

3.  **Traduzir** a comunicação animal em informações compreensíveis,
    indicando o tipo de vocalização (alarme, acasalamento, territorial)
    e fornecendo curiosidades educativas.

4.  **Partilhar** dados através de uma plataforma web para
    investigadores, educadores e decisores políticos.

O nome \"BioLingo\" deriva de \"Bio\" (vida) e \"Lingo\" (língua),
simbolizando a nossa missão de compreender a linguagem universal dos
animais.

[]{#_Toc211871754 .anchor}1.3. Visão, Missão e Valores

**Visão**: Ser a plataforma líder em Angola para a compreensão e
conservação da biodiversidade através da bioacústica e inteligência
artificial, capacitando cidadãos, investigadores e decisores a proteger
o nosso património natural.

**Missão**: Desenvolver e implementar uma solução tecnológica inovadora
que permita a recolha, análise e interpretação de sons de animais,
traduzindo a sua comunicação em informações acionáveis para a educação,
investigação científica, ecoturismo e conservação da fauna angolana.

**Valores**:

-   **Inovação**: Utilizar as mais recentes tecnologias de IA e
    bioacústica.

-   **Sustentabilidade**: Contribuir ativamente para os ODS.

-   **Colaboração**: Fomentar parcerias com comunidades locais,
    instituições de pesquisa, ONGs e governo.

-   **Educação**: Capacitar e sensibilizar o público sobre a
    biodiversidade.

-   **Integridade**: Garantir precisão científica e ética na recolha e
    uso de dados.

[]{#_Toc211871755 .anchor}1.4. Objectivos do Projecto

**Objectivos Gerais**:

-   Criar uma base de dados bioacústica abrangente da fauna angolana.

-   Desenvolver modelos de IA capazes de identificar espécies e
    interpretar vocalizações com alta precisão.

-   Promover a educação ambiental e a ciência cidadã em Angola.

-   Fornecer ferramentas de monitoramento para a conservação de espécies
    ameaçadas.

**Objectivos Específicos**:

-   Lançar um MVP focado em aves de Angola até março de 2026.

-   Expandir para mamíferos emblemáticos (elefantes, primatas, palancas)
    até setembro de 2026.

-   Implementar uma rede de sensores bioacústicos em parques nacionais
    até setembro de 2027.

-   Estabelecer parcerias com o Ministério do Ambiente, universidades
    angolanas e ONGs.

[]{#_Toc211871756 .anchor}1.5. Casos de Uso

**Para Utilizadores Comuns e Turistas**: Um visitante no Parque Nacional
da Quiçama grava um som através da aplicação móvel e recebe
instantaneamente a identificação da espécie, o contexto do som e
curiosidades educativas, enriquecendo a experiência turística.

**Para Investigadores e Conservacionistas**: Uma plataforma web com
estatísticas regionais, mapas de ocorrência de espécies, identificação
de espécies raras ou ameaçadas (como a Palanca Negra Gigante) e
ferramentas de análise avançadas.

**Para Gestores de Áreas Protegidas**: Estações fixas de gravação em
florestas e savanas com upload automático e alertas em tempo real para
detetar atividade de elefantes em áreas de caça ilegal ou monitorizar a
saúde de ecossistemas.

**Para Educadores**: Módulos didáticos específicos para o currículo
escolar angolano, promovendo o conhecimento sobre a fauna local e a
importância da conservação.

[]{#_Toc211871757 .anchor}2. Revisão de Literatura

[]{#_Toc211871758 .anchor}2.1. Bioacústica em África: Estado da Arte

A bioacústica, definida como o estudo da produção, transmissão e receção
de sons animais, emergiu como uma ferramenta poderosa para a compreensão
da biodiversidade e conservação de espécies. Um estudo abrangente
conduzido por Becker et al. (2022) analisou sistematicamente 727
publicações sobre bioacústica em África, cobrindo o período entre 1953 e
meados de 2020. Esta revisão revelou que a maioria dos estudos (69%)
concentrou-se no comportamento animal, com espécies terrestres a
representarem 88,6% da pesquisa, enquanto habitats de água doce (4,8%) e
marinhos (6,6%) permaneceram substancialmente subrepresentados.

Os mamíferos emergiram como o grupo taxonómico mais estudado, seguidos
pelas aves. No entanto, uma descoberta preocupante foi que 74,3% dos
autores que contribuíram para este corpo de conhecimento eram afiliados
não-africanos, sublinhando a necessidade urgente de desenvolver
capacidades locais de pesquisa em bioacústica, particularmente em países
como Angola.

**Lacunas Identificadas**: A revisão de Becker et al. (2022) identificou
que a pesquisa em bioacústica em África tem considerável espaço para
expansão institucional, taxonómica e temática. Angola, com a sua
impressionante diversidade de espécies e ecossistemas, apresenta uma
oportunidade única para contribuir significativamente para este campo.

[]{#_Toc211871759 .anchor}2.2. Comunicação Animal: Fundamentos
Científicos

A comunicação animal envolve sistemas complexos e estruturados que
permitem aos animais transmitir informações sobre o seu ambiente, estado
emocional e intenções. Estudos científicos demonstraram que diferentes
espécies desenvolveram sistemas de comunicação sofisticados:

**Elefantes Africanos**: Os elefantes africanos (*Loxodonta africana*)
são conhecidos pela sua utilização de vocalizações de baixa frequência,
denominadas \"rumbles\", que funcionam na comunicação de longa
distância. Estas vocalizações variam entre 15 a 35 Hz, com níveis de
pressão sonora que podem atingir 117 dB, permitindo a comunicação
através de muitos quilómetros. Estudos demonstraram que os elefantes
africanos possuem capacidades de comunicação complexas, incluindo a
capacidade de produzir chamadas antifonais (respostas vocais
coordenadas). Pesquisas recentes revelaram que os elefantes africanos
utilizam chamadas específicas para se dirigirem a indivíduos
particulares, funcionando de forma semelhante a \"nomes\".

**Primatas**: Os macacos vervet (*Chlorocebus pygerythrus*) constituem o
exemplo clássico de comunicação semântica em animais não-humanos.
Estudos pioneiros demonstraram que estes primatas emitem sons diferentes
para predadores distintos: um som para águias (levando-os a correr para
arbustos), outro para leopardos (fazendo-os subir às árvores) e outro
para cobras (ficando em pé a olhar para o chão). Esta especificidade
demonstra que as vocalizações não são apenas ruído, mas contêm conteúdo
informacional específico.

**Aves Africanas**: As aves africanas apresentam uma diversidade vocal
extraordinária, com padrões de vocalização que incluem duetos vocais,
cantos territoriais e chamadas de alarme. A região da África Austral,
que inclui Angola, alberga espécies com chamadas icónicas que simbolizam
o som de África.

[]{#_Toc211871760 .anchor}2.3. Inteligência Artificial em Bioacústica

Nos últimos anos, a inteligência artificial (IA) e o machine learning
(ML) revolucionaram o campo da bioacústica, permitindo a análise
automatizada de grandes volumes de dados de áudio. As redes neurais
convolucionais (CNNs) emergiram como particularmente eficazes para
analisar espectrogramas de sons animais, tratando-os como imagens.
Estudos demonstraram que modelos de deep learning podem classificar
espécies de aves com alta precisão, superando métodos tradicionais.

Um estudo de Tuia et al. (2022) sobre perspetivas de machine learning
para a conservação da vida selvagem destacou que os sensores
bioacústicos são uma alternativa aos sistemas baseados em imagens,
utilizando microfones e hidrofones para estudar animais vocais e os seus
habitats. A IA permite não apenas a identificação de espécies, mas
também a deteção de padrões comportamentais, monitoramento de populações
e até a identificação de ameaças como a exploração madeireira ilegal.

**Desafios e Soluções**: Um obstáculo importante é a necessidade de
conjuntos de dados de treino muito grandes. Para regiões como Angola,
onde os dados bioacústicos são escassos, a utilização de técnicas de
transfer learning (aprendizagem por transferência) pode ser uma solução.
Esta abordagem envolve a utilização de modelos pré-treinados em grandes
conjuntos de dados globais e o seu ajuste fino com dados específicos da
fauna angolana.

[]{#_Toc211871761 .anchor}2.4. Aplicações na Conservação

O monitoramento acústico passivo (PAM - Passive Acoustic Monitoring)
emergiu como uma ferramenta valiosa para a conservação da vida selvagem.
Esta técnica envolve a colocação de gravadores automáticos em habitats
naturais para recolher dados de áudio continuamente, sem a necessidade
de presença humana constante. O PAM oferece várias vantagens sobre
métodos tradicionais de monitoramento, incluindo a capacidade de operar
em condições adversas, a não-invasividade e a possibilidade de criar
\"cápsulas temporais bioacústicas\" que documentam a biodiversidade ao
longo do tempo.

Para Angola, onde muitas áreas protegidas são remotas e de difícil
acesso, o PAM poderia ser uma ferramenta transformadora. A implementação
de redes de sensores bioacústicos em parques como o da Quiçama, Maiombe
e Iona permitiria o monitoramento contínuo de espécies-chave, a deteção
de atividades de caça furtiva e a avaliação do impacto das mudanças
climáticas na biodiversidade.

[]{#_Toc211871762 .anchor}2.5. Contexto Angolano: Biodiversidade e
Conservação

Angola possui uma das biodiversidades mais ricas do continente africano,
com ecossistemas que variam desde florestas tropicais no norte (Maiombe)
até desertos costeiros no sul (Iona). Segundo dados de 2002-2003, o país
possui 12 áreas protegidas, cobrindo aproximadamente 10% da área total
de terra. As áreas protegidas incluem parques nacionais emblemáticos
como o Parque Nacional da Quiçama, Parque Nacional do Maiombe, Parque
Nacional da Cangandala e Parque Nacional do Iona.

No entanto, a biodiversidade angolana enfrenta ameaças significativas.
Três décadas de conflito armado (1975-2002) tiveram um impacto
devastador na fauna angolana. Estudos recentes demonstram que as
comunidades de mamíferos selvagens em Angola no pós-guerra estão
empobrecidas e simplificadas, com declínios significativos na riqueza de
espécies ao longo dos últimos 50 anos, sendo os mamíferos de maior porte
os mais severamente afetados. Esta realidade sublinha a urgência de
implementar estratégias de conservação eficazes e baseadas em dados
científicos robustos, onde a bioacústica pode desempenhar um papel
crucial.

[]{#_Toc211871763 .anchor}3. Dados e Fontes de Informação

[]{#_Toc211871764 .anchor}3.1. Bases de Dados Globais Existentes

Para a fase inicial do projecto BioLingo, iremos recorrer a bases de
dados globais que fornecem acesso a milhões de gravações de sons de
animais:

**Tabela 1: Bases de Dados Bioacústicas Globais**

  ------------------------------------------------------------------------------
  Base de Dados    Descrição                   Relevância para       Acesso
                                               Angola                
  ---------------- --------------------------- --------------------- -----------
  **Macaulay       Um dos maiores arquivos do  Essencial para a      API via
  Library (Cornell mundo, com milhões de sons  validação e treino de eBird
  Lab of           de aves, mamíferos,         modelos com espécies  
  Ornithology)**   anfíbios e insetos.         presentes em Angola.  

  **Xeno-canto**   Banco mundial de sons de    Fundamental para      API pública
                   aves, permitindo buscas por identificar e         
                   espécie, região, etc.       catalogar aves        
                                               angolanas.            

  **GBIF (Global   Conecta dados de            Uma fonte valiosa     API pública
  Biodiversity     biodiversidade, incluindo   para a biodiversidade 
  Information      sons de animais, de         angolana.             
  Facility)**      coleções como Macaulay e                          
                   Xeno-canto.                                       

  **Elephant       Registra sons de elefantes, Crucial para o        Contacto
  Listening        incluindo chamadas          monitoramento de      direto
  Project**        infrassónicas.              elefantes em parques  
                                               como o da Quiçama ou  
                                               Maiombe.              

  **Cetacean Sound Coleções com milhares de    Relevante para a      Contacto
  Archives**       gravações de baleias e      costa angolana e o    direto
                   golfinhos.                  estudo da vida        
                                               marinha local.        

  **Earth Species  Utiliza IA para analisar    Uma inspiração para a Parceria
  Project**        grandes bancos de dados de  nossa visão em        potencial
                   sons, com o objetivo de     Angola.               
                   criar um tradutor universal                       
                   de comunicação animal.                            
  ------------------------------------------------------------------------------

[]{#_Toc211871765 .anchor}

3.2. APIs Disponíveis

**Xeno-canto API 2.0**: Permite buscas programáticas por espécie,
região, país, qualidade de gravação, etc. Retorna dados em JSON com
metadados (nome científico, espécie, local, link do áudio). Documentação
disponível em:
[[https://www.xeno-canto.org/article/153]{.underline}](https://www.xeno-canto.org/article/153)

**eBird API**: Integrado com a Macaulay Library, permite acesso
programático a observações de aves e sons. Requer chave de API e tem
termos de uso para fins não-comerciais. Documentação disponível em:
[[https://www.birds.cornell.edu/home/ebird-api-terms-of-use/]{.underline}](https://www.birds.cornell.edu/home/ebird-api-terms-of-use/)

**GBIF API**: Fornece acesso a dados de biodiversidade global, incluindo
ocorrências de espécies e links para recursos multimédia. Documentação
disponível em:
[[https://techdocs.gbif.org/en/openapi/]{.underline}](https://techdocs.gbif.org/en/openapi/)

[]{#_Toc211871766 .anchor}3.3. Recolha de Dados Locais em Angola

Reconhecendo a singularidade da fauna angolana, é imperativo
complementar os dados globais com gravações específicas do nosso
território:

**Parcerias com Parques Nacionais e Reservas Naturais**: Estabelecer
colaborações com instituições como o Parque Nacional da Quiçama, Parque
Nacional da Kissama, Parque Nacional do Maiombe e outras áreas de
conservação para a instalação de gravadores bioacústicos e a recolha
sistemática de sons.

**Engajamento Comunitário (Ciência Cidadã)**: Lançar iniciativas de
ciência cidadã, incentivando comunidades locais, estudantes e
entusiastas da natureza a gravar e submeter sons de animais através da
aplicação móvel do BioLingo. Esta abordagem não só enriquece a base de
dados, como também promove a educação ambiental e o sentido de pertença.

**Colaboração com Investigadores Locais**: Trabalhar em conjunto com
biólogos, ecologistas e universidades angolanas para aceder a coleções
de dados existentes e para orientar a recolha de novos dados, garantindo
a sua relevância científica.

[]{#_Toc211871767 .anchor}3.4. Metadados e Anotação

Cada gravação de áudio será acompanhada de metadados ricos, incluindo:

-   **Espécie**: Nome científico e comum.

-   **Localização**: Coordenadas GPS (latitude, longitude), parque
    nacional, província.

-   **Data e Hora**: Timestamp completo da gravação.

-   **Tipo de Vocalização**: Alarme, acasalamento, territorial, social,
    etc.

-   **Contexto Ambiental**: Tipo de habitat, condições climáticas,
    presença de outras espécies.

-   **Qualidade da Gravação**: Avaliação da clareza e ausência de ruído.

-   **Fonte**: API externa, ciência cidadã, sensor bioacústico,
    investigador.

A anotação dos sons será feita manualmente por especialistas angolanos
para dados locais, e semi-automaticamente para dados de APIs globais,
garantindo a precisão e relevância científica.

[]{#_Toc211871768 .anchor}4. Tecnologia e Arquitetura

[]{#_Toc211871769 .anchor}4.1. Arquitetura Geral do Sistema

A arquitetura do BioLingo seguirá o modelo de microsserviços, utilizando
contêineres para isolar os componentes e orquestração para gerir o
deployment. Esta abordagem garante escalabilidade, robustez e alta
disponibilidade.

**Tabela 2: Componentes da Arquitetura BioLingo**

  -------------------------------------------------------------------------
  Componente        Descrição                       Tecnologias
  ----------------- ------------------------------- -----------------------
  **Frontend        Aplicação móvel para gravação,  React Native / Flutter
  (Mobile)**        upload e visualização de        
                    resultados.                     

  **Frontend        Plataforma web para dashboard   React, Tailwind CSS
  (Web)**           científico, mapas e biblioteca  
                    de sons.                        

  **Backend API**   Serviço RESTful para            FastAPI (Python),
                    comunicação entre frontend e    Uvicorn
                    modelos de ML/base de dados.    

  **Serviço de      Microsserviço dedicado ao       Python, Librosa, Pydub,
  Processamento de  pré-processamento e engenharia  Celery
  Áudio**           de recursos de áudio.           

  **Serviço de      Microsserviço que aloja os      Python,
  Inferência de     modelos de ML treinados para    PyTorch/TensorFlow
  ML**              fazer previsões.                Serving, ONNX Runtime

  **Base de Dados** Armazenamento de metadados de   PostgreSQL, PostGIS
                    sons, espécies, localizações e  
                    utilizadores.                   

  **Armazenamento   Armazenamento escalável para    AWS S3, Supabase
  de Objetos**      arquivos de áudio brutos e      Storage
                    processados.                    

  **Orquestração de Gestão e escalonamento dos      Kubernetes, Docker
  Contêineres**     microsserviços em ambiente de   
                    nuvem.                          

  **Monitoramento e Recolha de métricas de          Prometheus, Grafana,
  Logging**         desempenho e logs de aplicação. ELK Stack
  -------------------------------------------------------------------------

[]{#_Toc211871770 .anchor}4.2. Tecnologias de Processamento de Áudio

**Bibliotecas Python**:

-   **Librosa**: Para análise de áudio, extração de características
    (MFCCs, espectrogramas, pitch, energia).

-   **Pydub**: Para manipulação de áudio (normalização, segmentação,
    conversão de formatos).

-   **Torchaudio**: Para integração com PyTorch e processamento de áudio
    em deep learning.

**Engenharia de Recursos (Feature Engineering)**:

-   **Espectrogramas**: Conversão de sinais de áudio em representações
    visuais que capturam características de frequência e tempo.

-   **MFCCs (Mel-Frequency Cepstral Coefficients)**: Representação
    compacta das características espectrais do som.

-   **Características Temporais**: Pitch, energia, taxa de cruzamento
    por zero, duração.

-   **Características Contextuais**: Localização geográfica, hora do
    dia, estação do ano, tipo de habitat.

[]{#_Toc211871771 .anchor}4.3. Modelos de Machine Learning

**Redes Neurais Convolucionais (CNNs)**: Especialmente eficazes para
analisar espectrogramas, tratando-os como imagens. Serão a base para a
classificação de espécies.

**Redes Neurais Recorrentes (RNNs) / LSTMs**: Para capturar dependências
temporais em sequências de áudio, úteis para identificar padrões de
vocalização mais longos ou sequências de chamadas.

**Transfer Learning**: Utilização de modelos pré-treinados em grandes
datasets de áudio (ex: AudioSet, BirdCLEF) e ajuste fino (fine-tuning)
com os nossos dados específicos de fauna angolana para acelerar o
desenvolvimento e melhorar o desempenho.

**Frameworks**:

-   **PyTorch**: Para desenvolvimento e treino de modelos de deep
    learning.

-   **TensorFlow/Keras**: Alternativa para desenvolvimento de modelos.

-   **scikit-learn**: Para modelos de ML tradicionais e
    pré-processamento.

[]{#_Toc211871772 .anchor}4.4. Gestão de Dados e Modelos (MLOps)

**Controle de Versão**:

-   **Git**: Para código-fonte.

-   **DVC (Data Version Control)**: Para datasets e modelos.

**Rastreamento de Experimentos**:

-   **MLflow**: Para registar parâmetros, métricas e artefatos de cada
    experimento de treino.

**Registro de Modelos**: Armazenamento centralizado de modelos treinados
e suas versões.

**Pipelines de ML Automatizados**: Utilização de ferramentas como
Kubeflow ou Airflow para automatizar as etapas de pré-processamento,
treino e avaliação.

[]{#_Toc211871773 .anchor}4.5. Infraestrutura de Deployment

**Contêinerização**: Todos os serviços serão empacotados em contêineres
Docker para garantir consistência entre os ambientes de desenvolvimento,
teste e produção.

**Orquestração**: Utilizaremos Kubernetes para gerir a implantação,
escalonamento e auto-recuperação dos contêineres na nuvem.

**Ambientes**: Teremos ambientes de desenvolvimento, staging e produção
para testar e validar as alterações antes de as disponibilizar aos
utilizadores finais.

**CI/CD Pipelines**: Implementaremos pipelines de Integração
Contínua/Deployment Contínuo (CI/CD) usando ferramentas como GitHub
Actions ou GitLab CI para automatizar os testes, construção e
implantação do código.

[]{#_Toc211871774 .anchor}4.6. Considerações de Conectividade para
Angola

Reconhecendo as realidades de conectividade em Angola, a plataforma será
desenhada para:

-   **Funcionalidade Offline**: A aplicação móvel permitirá a gravação
    de sons offline, com sincronização automática quando houver conexão.

-   **Compressão de Dados**: Utilização de algoritmos de compressão de
    áudio para reduzir o tamanho dos ficheiros a enviar.

-   **Edge Computing**: Processamento inicial de áudio no dispositivo
    móvel quando possível, reduzindo a necessidade de largura de banda.

[]{#_Toc211871775 .anchor}5. Alinhamento com os Objectivos de
Desenvolvimento Sustentável (ODS)

O projecto BioLingo demonstra um forte alinhamento com vários Objectivos
de Desenvolvimento Sustentável da ONU:

**Tabela 3: Alinhamento do BioLingo com os ODS**

  -------------------------------------------------------------------------
  ODS                Contribuição do BioLingo em Angola
  ------------------ ------------------------------------------------------
  **ODS 4 - Educação Ferramenta educativa interativa sobre biodiversidade
  de Qualidade**     para escolas e universidades angolanas, promovendo o
                     conhecimento sobre a nossa fauna.

  **ODS 9 -          Uso de IA, big data e bioacústica para uma solução
  Indústria,         tecnológica inovadora, com API aberta e parcerias de
  Inovação e         pesquisa com universidades angolanas e centros de
  Infraestrutura**   investigação.

  **ODS 11 - Cidades Monitoramento ambiental em áreas urbanas (parques,
  e Comunidades      zonas verdes) e rurais, engajando as comunidades
  Sustentáveis**     angolanas no registo de sons e na proteção do
                     ambiente.

  **ODS 13 - Ação    Ajuda a entender o impacto das mudanças climáticas na
  Contra a Mudança   biodiversidade angolana através do monitoramento
  Global do Clima**  acústico, apoiando políticas públicas de adaptação.

  **ODS 14 - Vida na Potencial para monitoramento da vida marinha
  Água**             (bioacústica oceânica) na costa angolana, com
                     parcerias de conservação marinha para proteger os
                     nossos oceanos.

  **ODS 15 - Vida    Contribuição direta para a conservação da fauna e
  Terrestre**        biodiversidade terrestre angolana, identificação de
                     espécies em risco (como a Palanca Negra Gigante) e
                     mapeamento colaborativo em parques nacionais como
                     Quiçama e Maiombe.
  -------------------------------------------------------------------------

[]{#_Toc211871776 .anchor}6. Conclusão

O projecto BioLingo, proposto pelo Grupo nº 14, representa uma
iniciativa inovadora e com grande potencial para impactar positivamente
a conservação da biodiversidade, a educação ambiental e a pesquisa
científica em Angola. A revisão de literatura demonstra que a
bioacústica, combinada com inteligência artificial, é uma ferramenta
poderosa e promissora. A disponibilidade de bases de dados globais, APIs
acessíveis e a possibilidade de recolha de dados locais fornecem uma
base sólida para o desenvolvimento do projecto. A arquitetura
tecnológica proposta, baseada em microsserviços, machine learning e
MLOps, garante escalabilidade, robustez e manutenibilidade.

Ao seguir um roadmap de desenvolvimento faseado e estratégias de
sustentabilidade claras, o BioLingo pode evoluir para uma plataforma de
referência na compreensão da linguagem animal, contribuindo
significativamente para os Objectivos de Desenvolvimento Sustentável e
para a valorização do nosso património natural angolano. O Grupo nº 14
está empenhado em entregar um projecto de excelência, com impacto real
no nosso país.

[]{#_Toc211862245 .anchor}Referências

> \[1\] Wildlife Acoustics. (n.d.). Bioacoustics 101: What is Animal
> Bioacoustics? Disponível em:
> [[https://www.wildlifeacoustics.com/resources/bioacoustics]{.underline}](https://www.wildlifeacoustics.com/resources/bioacoustics)
>
> \[2\] Becker, F. K., Shabangu, F. W., Gridley, T., Wittmer, H. U., &
> Marsland, S. (2022). Sounding out a continent: seven decades of
> bioacoustics research in Africa. *Bioacoustics*, 31(6), 646-667.
> [[https://doi.org/10.1080/09524622.2021.2021987]{.underline}](https://doi.org/10.1080/09524622.2021.2021987)
>
> \[3\] EarthTrends. (2003). Biodiversity and Protected Areas: Angola.
> Country Profiles. Disponível em:
> [[https://www.biofund.org.mz/wp-content/uploads/2018/11/F1220.Angola-Biodiversity-1.pdf]{.underline}](https://www.biofund.org.mz/wp-content/uploads/2018/11/F1220.Angola-Biodiversity-1.pdf)
>
> \[4\] Convention on Biological Diversity. (n.d.). Angola - Country
> Profile. Disponível em:
> [[https://www.cbd.int/countries/profile/?country=ao]{.underline}](https://www.cbd.int/countries/profile/?country=ao)
>
> \[5\] WorldAtlas. (n.d.). Angola\'s Endangered Mammals. Disponível em:
> [[https://www.worldatlas.com/articles/angola-s-endangered-mammals.html]{.underline}](https://www.worldatlas.com/articles/angola-s-endangered-mammals.html)
>
> \[6\] Rocha, F., Chicomo, M., Lutondo, E., et al. (2025). Wildlife
> mammal communities in post-war Angola are depleted and simplified:
> Implications for biodiversity conservation. *Animal Conservation*.
> [[https://doi.org/10.1111/acv.13004]{.underline}](https://doi.org/10.1111/acv.13004)
>
> \[7\] Soltis, J., Leong, K., & Savage, A. (2005). African Elephant
> Vocal Communication I: Antiphonal Calling Behaviour Among Related
> Females. *Animal Behaviour*, 70(3), 579-587.
>
> \[8\] Save the Elephants. (n.d.). Elephant Communication. Disponível
> em:
> [[https://savetheelephants.org/our-work/science/behaviour-society/elephant-communication/]{.underline}](https://savetheelephants.org/our-work/science/behaviour-society/elephant-communication/)
>
> \[9\] Soltis, J. (2010). Vocal communication in African Elephants
> (*Loxodonta africana*). *Zoo Biology*, 29(2), 192-209.
> [[https://doi.org/10.1002/zoo.20251]{.underline}](https://doi.org/10.1002/zoo.20251)
>
> \[10\] Science Media Centre Spain. (2024, June 10). African elephants
> address each other by name, calls study finds. Disponível em:
> [[https://sciencemediacentre.es/en/african-elephants-address-each-other-name-calls-study-finds-african-elephants-address-each-other]{.underline}](https://sciencemediacentre.es/en/african-elephants-address-each-other-name-calls-study-finds-african-elephants-address-each-other)
>
> \[11\] Price, T., Wadewitz, P., Cheney, D., Seyfarth, R.,
> Hammerschmidt, K., & Fischer, J. (2015). Vervets revisited: A
> quantitative analysis of alarm call structure and context specificity.
> *Scientific Reports*, 5, 13220.
> [[https://doi.org/10.1038/srep13220]{.underline}](https://doi.org/10.1038/srep13220)
>
> \[12\] Seyfarth, R. M., & Cheney, D. L. (2003). Meaning and emotion in
> animal vocalizations. *Annals of the New York Academy of Sciences*,
> 1000(1), 32-55.
>
> \[13\] Tuia, D., Kellenberger, B., Beery, S., Costelloe, B. R., Zuffi,
> S., Risse, B., \... & Berger-Wolf, T. (2022). Perspectives in machine
> learning for wildlife conservation. *Nature Communications*, 13(1),
> 792.
> [[https://doi.org/10.1038/s41467-022-27980-y]{.underline}](https://doi.org/10.1038/s41467-022-27980-y)
>
> \[14\] Oikarinen, T., Srinivasan, K., Meisner, O., Hyman, J. B.,
> Parikh, S., Quader, A., \... & Sahin, F. (2019). Deep convolutional
> network for animal sound classification and source attribution using
> dual audio recordings. *The Journal of the Acoustical Society of
> America*, 145(2), 654-662.
>
> \[15\] Sprengel, E., Jaggi, M., Kilcher, Y., & Hofmann, T. (2016).
> Audio based bird species identification using deep learning
> techniques. *CLEF (Working Notes)*, 2016, 547-559.
>
> \[16\] Jeantet, L., Vigon, V., Geiger, B. C., & Beaugendre, N. (2023).
> Improving deep learning acoustic classifiers with contextual
> information for wildlife monitoring. *Ecological Informatics*, 77,
> 102256.
>
> \[17\] McLoughlin, M. P., Stewart, R., & McElligott, A. G. (2019).
> Automated bioacoustics: methods in ecology and conservation and their
> potential for animal welfare monitoring. *Journal of the Royal Society
> Interface*, 16(155), 20190225.
>
> \[18\] Macaulay Library. Disponível em:
> [[https://www.macaulaylibrary.org/]{.underline}](https://www.macaulaylibrary.org/)
>
> \[19\] Xeno-canto API 2.0. Disponível em:
> [[https://www.xeno-canto.org/article/153]{.underline}](https://www.xeno-canto.org/article/153)
>
> \[20\] eBird API Terms of Use. Disponível em:
> [[https://www.birds.cornell.edu/home/ebird-api-terms-of-use/]{.underline}](https://www.birds.cornell.edu/home/ebird-api-terms-of-use/)
>
> \[21\] GBIF API Reference. Disponível em:
> [[https://techdocs.gbif.org/en/openapi/]{.underline}](https://techdocs.gbif.org/en/openapi/)
