import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { Injectable } from '@angular/core';

@Injectable()
export class PerfilService {
    constructor(public http: HttpClient){}

    remove(perfil: number, id: string)
    {
        return this.http.put(
            `${API_CONFIG.baseUrl}/usuarios/${id}/removePerfil`,
            {perfil: perfil},
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    };

    add(perfil: number, id: string)
    {
        return this.http.put(
            `${API_CONFIG.baseUrl}/usuarios/${id}/addPerfil`,
            {perfil: perfil},
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    };
};