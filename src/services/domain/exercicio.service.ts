import { GrupoDTO } from './../../models/grupo.dto';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { ExercicioDTO } from './../../models/exercicio.dto';
import { Injectable } from '@angular/core';

@Injectable()
export class ExercicioService {

    constructor(public http: HttpClient){};

    findByCategory(id: string): Observable<ExercicioDTO[]>
    {
        return this.http.get<ExercicioDTO[]>(`${API_CONFIG.baseUrl}/grupos/${id}/exercicios`);
    };

    findAll(): Observable<ExercicioDTO[]>
    {
        return this.http.get<ExercicioDTO[]>(`${API_CONFIG.baseUrl}/exercicios`);
    };

    findOne(id: string): Observable<ExercicioDTO>
    {
        return this.http.get<ExercicioDTO>(`${API_CONFIG.baseUrl}/exercicios/${id}`);
    };

    findOneGrupoByExercicio(id: string): Observable<GrupoDTO>
    {
        return this.http.get<GrupoDTO>(`${API_CONFIG.baseUrl}/grupos/${id}/grupoByExercicio`);
    }
};