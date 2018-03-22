import { UsuarioDTO } from './../../models/usuario.dto';
import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient, public storage: StorageService){

    };

    findByEmail(email: string): Observable<UsuarioDTO> {

        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/email?email=${email}`);
    };

    getImageBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    };

    save(usuario: UsuarioDTO)
    {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios`,
            usuario,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    };

    findAll(): Observable<UsuarioDTO> {
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios`);
    }
    

};