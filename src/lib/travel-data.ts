
import { animalContributors } from './animal-data';

export type TravelDiary = {
  id: string;
  title: string;
  authorId: string;
  location: string;
  mainImageId: string;
  mainImageDataUri?: string;
  summary: string;
  speciesCount: number;
  recordingsCount: number;
};

export const travelDiaries: TravelDiary[] = [
  {
    id: 'kissama-expedition',
    title: 'Expedição Sonora ao Parque da Kissama',
    authorId: 'adam-lambeter',
    location: 'Parque Nacional da Kissama, Angola',
    mainImageId: 'kissama-park',
    summary: 'Uma jornada de 3 dias pela savana da Kissama, gravando os sons da vida selvagem, desde o rugido dos leões ao amanhecer até o canto das aves raras.',
    speciesCount: 28,
    recordingsCount: 74,
  },
  {
    id: 'tundavala-acoustic-journey',
    title: 'Ecos da Tundavala: Uma Viagem Acústica',
    authorId: 'lysa-ansaldi',
    location: 'Fenda da Tundavala, Huíla',
    mainImageId: 'tundavala-fissure',
    summary: 'Explorei as paisagens sonoras únicas da Tundavala, capturando o vento que ecoa pelas fendas e os chamados das aves de altitude.',
    speciesCount: 15,
    recordingsCount: 42,
  },
  {
    id: 'cangandala-discovery',
    title: 'Os Segredos da Palanca Negra Gigante',
    authorId: 'tommy-west',
    location: 'Parque Nacional da Cangandala',
    mainImageId: 'cangandala-park',
    summary: 'Passei uma semana no santuário da Palanca Negra Gigante, documentando não só a sua presença, mas também a rica biodiversidade sonora que a rodeia.',
    speciesCount: 45,
    recordingsCount: 112,
  },
];

    