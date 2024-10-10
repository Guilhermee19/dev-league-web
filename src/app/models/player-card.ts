export interface IPlayerCard {
  name: string;
  number: number;
  image: string;
  size: 'LOW' | 'MEDIUM' | 'HIGH'; // restringe os valores possíveis
  position: 'ATACANTE' | 'ZAGUEIRO' | 'GOLEIRO' | 'MEIO-CAMPO'; // posições no campo em português
  score: number; // pontuação geral do jogador
  skills: {
    strength: number;
    speed: number;
    ability: number;
    defence: number;
  };
}
