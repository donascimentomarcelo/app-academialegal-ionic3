import { UsuarioDTO } from './../../../models/usuario.dto';
import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../../config/api.config';

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient, public storage: StorageService){

    };

    findByEmail(email: string): Observable<UsuarioDTO> {

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' +  token});

        console.log(authHeader);

        return this.http.get<UsuarioDTO>(
            `${API_CONFIG.baseUrl}/usuarios/email?email=${email}`,
            {'headers': authHeader}
        );
    };

    getImageBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    };

};