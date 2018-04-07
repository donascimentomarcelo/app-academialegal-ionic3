import { RefDTO } from './ref.dto';
export interface ItemSerieDTO {
    letra: string;
    ordenation: number;
    repeticoes: string;
    observacao: string;
    exercicio: RefDTO;
}