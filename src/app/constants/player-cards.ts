import { IPlayerCard } from '@app/models/player-card';

export const PLAYERCARDS: IPlayerCard[] = [
  {
    name: 'Guilherme',
    number: 19,
    image:
      'https://noclaf-projects-storage.s3-sa-east-1.amazonaws.com/media/profile_image/i_am_gui.jpg',
    size: 'LOW', // LOW | MEDIUM | HIGH
    position: 'ZAGUEIRO',
    score: 8,
    skills: {
      strength: 2,
      speed: 4,
      ability: 1,
      defence: 2,
    },
  },
  {
    name: 'Kauã L',
    number: 13,
    image:
      'https://noclaf-projects-storage.s3-sa-east-1.amazonaws.com/media/profile_image/fa02bf77-4f56-4046-9784-08228c94f2bb.png',
    size: 'LOW', // LOW | MEDIUM | HIGH
    position: 'MEIO-CAMPO',
    score: 8,
    skills: {
      strength: 1,
      speed: 3,
      ability: 2,
      defence: 1,
    },
  },
  {
    name: 'Kauan X',
    number: 10,
    image:
      'https://noclaf-projects-storage.s3-sa-east-1.amazonaws.com/media/profile_image/3ca0329f-4d80-4e72-8659-754f85e2bdc5.png',
    size: 'LOW', // LOW | MEDIUM | HIGH
    position: 'ATACANTE',
    score: 15,
    skills: {
      strength: 4,
      speed: 4,
      ability: 3,
      defence: 4,
    },
  },
  {
    name: 'Bryan',
    number: 7,
    image: '',
    size: 'LOW', // LOW | MEDIUM | HIGH
    position: 'GOLEIRO',
    score: 16,
    skills: {
      strength: 5,
      speed: 3,
      ability: 3,
      defence: 5,
    },
  },
  {
    name: 'Rolyson',
    number: 14,
    image:
      'https://noclaf-projects-storage.s3-sa-east-1.amazonaws.com/media/profile_image/01d62458-84f9-4531-bb86-4e4c778fa6db.png',
    size: 'LOW', // LOW | MEDIUM | HIGH
    position: 'MEIO-CAMPO',
    score: 13,
    skills: {
      strength: 3,
      speed: 4,
      ability: 3,
      defence: 3,
    },
  },
  {
    name: 'Lucino',
    number: 14,
    image:
      'https://noclaf-projects-storage.s3-sa-east-1.amazonaws.com/media/profile_image/92e88a3a-e224-436c-b896-030a10aa8c84.png',
    size: 'HIGH', // LOW | MEDIUM | HIGH
    position: 'ZAGUEIRO',
    score: 11,
    skills: {
      strength: 4,
      speed: 2,
      ability: 1,
      defence: 4,
    },
  },
  {
    name: 'Rodrigo L',
    number: 14,
    image:
      'https://noclaf-projects-storage.s3-sa-east-1.amazonaws.com/media/profile_image/9a6970cd-fe66-43bf-ae19-ffe3ce8a74a6.png',
    size: 'LOW', // LOW | MEDIUM | HIGH
    position: 'MEIO-CAMPO',
    score: 14,
    skills: {
      strength: 3,
      speed: 3,
      ability: 4,
      defence: 4,
    },
  },
];
