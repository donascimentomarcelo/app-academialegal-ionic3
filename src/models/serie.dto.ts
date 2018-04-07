import { RefDTO } from "./ref.dto";
import { ItemSerieDTO } from "./item-serie.dto";

export interface SerieDTO {
    solicitacao: RefDTO;
    observacao: string;
    itens: ItemSerieDTO[];
}