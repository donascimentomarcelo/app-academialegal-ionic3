import { SolicitacaoDTO } from './solicitacao.dto';
import { ItemSerieDTO } from "./item-serie.dto";

export interface SerieListDTO {
    solicitacao: SolicitacaoDTO;
    observacao: string;
    order: number;
    itens: ItemSerieDTO[];
}