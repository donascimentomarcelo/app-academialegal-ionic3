import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { ExercicioDTO } from './../../models/exercicio.dto';
import { Injectable } from '@angular/core';

@Injectable()
export class ExercicioService {

    constructor(public http: HttpClient){};

    findAll(id: string): Observable<ExercicioDTO[]>
    {
        return this.http.get<ExercicioDTO[]>(`${API_CONFIG.baseUrl}/grupos/${id}/exercicios`);
    };
};