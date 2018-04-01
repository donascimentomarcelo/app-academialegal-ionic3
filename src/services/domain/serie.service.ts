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

    find(): Observable <SerieDTO[]>
    {
        return this.http.get<SerieDTO[]>(`${API_CONFIG.baseUrl}/series`);
    };

}