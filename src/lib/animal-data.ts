export type AnimalContributor = {
    id: string;
    name: string;
    email: string;
    avatarImageId: string;
    mainImageId: string;
    mainImageHint: string;
    galleryImageIds: {id: string; hint: string}[];
    funFact: {
      title: string;
      fact: string;
    };
    followed: boolean;
    levelName: string;
  };
  
  export const animalContributors: AnimalContributor[] = [
    {
      id: 'adam-lambeter',
      name: 'António Victor Francisco',
      email: 'antoniofrancisco@gmail.com',
      avatarImageId: 'avatar1',
      mainImageId: 'fox',
      mainImageHint: 'fox snow',
      galleryImageIds: [
        { id: 'flamingo', hint: 'flamingo water' },
        { id: 'monarch-butterfly', hint: 'monarch butterfly' },
        { id: 'chameleon', hint: 'chameleon branch' },
        { id: 'robin', hint: 'robin perch' },
      ],
      funFact: {
        title: 'A Raposa Vermelha, Caçadora Silenciosa',
        fact: 'As raposas vermelhas têm uma audição incrível. Elas conseguem ouvir o som de um rato a escavar debaixo da neve e usam um salto em arco para o apanhar de surpresa.',
      },
      followed: true,
      levelName: 'Explorador Mestre',
    },
    {
      id: 'lysa-ansaldi',
      name: 'José Kutala Vale',
      email: 'josekutala@gmail.com',
      avatarImageId: 'avatar2',
      mainImageId: 'highland-cow',
      mainImageHint: 'highland cow',
      galleryImageIds: [
        { id: 'puffin', hint: 'puffin rock' },
        { id: 'rabbit', hint: 'rabbit field' },
        { id: 'elephant', hint: 'elephant savanna' },
        { id: 'painted-lady-butterfly', hint: 'butterfly flower' },
      ],
      funFact: {
        title: 'O Robusto Gado das Terras Altas',
        fact: 'O Gado das Terras Altas (Highland Cow) tem uma pelagem dupla. O subpelo lanoso mantém-no quente, enquanto o pelo exterior, oleoso e comprido, repele a chuva e a neve.',
      },
      followed: false,
      levelName: 'Aventureiro',
    },
    {
      id: 'tommy-west',
      name: 'Eudesmagno Miguel',
      email: 'eudesmagnomiguel@gmail.com',
      avatarImageId: 'avatar3',
      mainImageId: 'green-chameleon',
      mainImageHint: 'green chameleon',
      galleryImageIds: [
        { id: 'rhino', hint: 'rhino mud' },
        { id: 'fox-2', hint: 'fox forest' },
        { id: 'bald-eagle', hint: 'bald eagle' },
        { id: 'deer', hint: 'deer forest' },
      ],
      funFact: {
        title: 'Mestres da Mudança: O Camaleão',
        fact: 'Os camaleões não mudam de cor apenas para se camuflarem. A sua cor também reflete o seu estado de espírito, a temperatura, a saúde e a sua intenção de comunicar com outros camaleões.',
      },
      followed: true,
      levelName: 'Explorador Iniciante',
    },
  ];
  