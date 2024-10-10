import { IPlayerCard } from '@app/models/player-card';

export const PLAYERCARDS: IPlayerCard[] = [
  {
    name: 'Guilherme',
    number: 19,
    image:
      'https://noclaf-projects-storage.s3-sa-east-1.amazonaws.com/media/profile_image/i_am_gui.jpg',
    size: 'LOW', // LOW | MEDIUM | HIGH
    position: 'ZAGUEIRO',
    score: 7,
    skills: {
      agility: 1,
      strength: 2,
      speed: 4,
      ability: 2,
    },
  },
];
