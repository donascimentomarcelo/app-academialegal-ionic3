import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { API_CONFIG } from './../config/api.config';
import { StorageService } from './storage.service';
import { LocalUser } from '../models/local_user';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { UsuarioDTO } from '../models/usuario.dto';

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();
    email: string;

    constructor(
        public http: HttpClient,
        public storage: StorageService){

    }

    authenticate(creds: CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
                                creds,
                                {
                                    observe: 'response',
                                    responseType: 'text'
                                });
    };

    successfulLogin(authorizationValue: string)
    {
        let tok = authorizationValue.substring(7);

        this.email = this.jwtHelper.decodeToken(tok).sub;

        this.find(this.email)
            .subscribe(response => {
                let user: LocalUser = {
                    token: tok,
                    email: this.email,
                    nome: response.nome,
                    perfis: response.perfis,
                    id: response.id,
                };
                this.storage.setLocalUser(user);
            }, error => {})
    };

    logout()
    {
        this.storage.setLocalUser(null);
    };

    find(email: string): Observable<UsuarioDTO> {

        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/email?email=${email}`);
    };
}