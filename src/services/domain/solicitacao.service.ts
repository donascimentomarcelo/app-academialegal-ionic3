import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { SolicitacaoDTO } from '../../models/solicitacao.dto';


@Injectable()
export class SolicitacaoService {

    constructor(public http: HttpClient){};

    findAll(): Observable <SolicitacaoDTO[]>
    {
        return this.http.get<SolicitacaoDTO[]>(`${API_CONFIG.baseUrl}/solicitacoes`);
    };

    findBySolicitante(solicitante: string): Observable<SolicitacaoDTO[]>
    {
        return this.http.get<SolicitacaoDTO[]>(`${API_CONFIG.baseUrl}/solicitacoes/name?name=${solicitante}`);
    };

    findOne(id): Observable<SolicitacaoDTO>
    {
        return this.http.get<SolicitacaoDTO>(`${API_CONFIG.baseUrl}/solicitacoes/${id}`);
    };
}