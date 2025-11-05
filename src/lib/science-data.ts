export type ScienceArticle = {
    id: string;
    title: string;
    author: string;
    journal: string;
    year: number;
    summary: string;
    imageId: string;
    imageHint: string;
  };
  
  export const scienceArticles: ScienceArticle[] = [
    {
      id: 'acoustic-patterns-palanca-negra',
      title: 'Padrões Acústicos da Palanca Negra Gigante na Cangandala',
      author: 'Dr.ª Elisa Fernandes',
      journal: 'Revista Angolana de Biologia Conservacionista',
      year: 2023,
      summary: 'Uma análise detalhada das vocalizações da Palanca Negra Gigante, revelando padrões de comunicação complexos relacionados com a coesão do grupo e alertas de predadores.',
      imageId: 'cangandala-park',
      imageHint: 'angola forest',
    },
    {
      id: 'bird-dialects-tundavala',
      title: 'Dialetos de Aves na Escarpa da Tundavala: Um Estudo Comparativo',
      author: 'Prof. Kumbi Lemos',
      journal: 'Journal of African Ornithology',
      year: 2024,
      summary: 'Este estudo documenta variações geográficas nos cantos de aves endémicas da Tundavala, sugerindo uma rápida evolução cultural e especiação incipiente.',
      imageId: 'tundavala-fissure',
      imageHint: 'angola landscape',
    },
    {
        id: 'bioacoustic-monitoring-kissama',
        title: 'Monitorização Bioacústica como Ferramenta para a Gestão do Parque da Kissama',
        author: 'Dr. João Costa',
        journal: 'Ciência & Natureza Angola',
        year: 2022,
        summary: 'Implementação de uma rede de sensores acústicos para monitorizar a atividade da vida selvagem, avaliar a saúde do ecossistema e detetar atividades ilegais.',
        imageId: 'kissama-park',
        imageHint: 'angola savanna',
      },
      {
        id: 'ai-species-identification',
        title: 'Identificação de Espécies de Anfíbios com IA no Maiombe',
        author: 'MSc. Amélia Vaz',
        journal: 'Anais da Conferência de Tecnologia e Inovação Ambiental',
        year: 2024,
        summary: 'Desenvolvimento de um modelo de aprendizagem profunda que identifica espécies de rãs e sapos com 98% de precisão a partir de gravações noturnas, otimizando o trabalho de campo.',
        imageId: 'science-lab',
        imageHint: 'science lab',
      }
  ];
  