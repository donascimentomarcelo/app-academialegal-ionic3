import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SerieDTO } from '../../models/serie.dto';

@Injectable()
export class SerieService {

    constructor(public http: HttpClient){};

    insert(serie: SerieDTO)
    {
        return this.http.post(
            `${API_CONFIG.baseUrl}/series`,
            serie,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    };

    find(page : number = 0, linesPerPage : number = 24): Observable <SerieDTO[]>
    {
        return this.http.get<SerieDTO[]>(`${API_CONFIG.baseUrl}/series?page=${page}&linesPerPage=${linesPerPage}`);
    };

    findByAluno(aluno): Observable <SerieDTO[]>
    {
        return this.http.get<SerieDTO[]>(`${API_CONFIG.baseUrl}/series/name?name=${aluno}`);
    };

    findOne(id): Observable <SerieDTO>
    {
        return this.http.get<SerieDTO>(`${API_CONFIG.baseUrl}/series/${id}`);
    };

    findMySerie(page : number = 0, linesPerPage : number = 24): Observable <SerieDTO>
    {
        return this.http.get<SerieDTO>(`${API_CONFIG.baseUrl}/series/listByUser?page=${page}&linesPerPage=${linesPerPage}`);
    }

}