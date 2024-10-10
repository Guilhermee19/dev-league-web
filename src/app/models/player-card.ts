export interface IPlayerCard {
  name: string;
  number: number;
  image: string;
  size: 'LOW' | 'MEDIUM' | 'HIGH'; // restringe os valores possíveis
  position: 'ATACANTE' | 'ZAGUEIRO' | 'GOLEIRO' | 'MEIO-CAMPISTA'; // posições no campo em português
  score: number; // pontuação geral do jogador
  skills: {
    agility: number;
    strength: number;
    speed: number;
    ability: number;
  };
}
