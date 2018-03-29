import { ExercicioDTO } from "./exercicio.dto";

export interface CartItem {
    letra: string;
    repeticoes: string;
    observacao: string;
    exercicio: ExercicioDTO;
}