import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { API_CONFIG } from './../config/api.config';
import { StorageService } from './storage.service';
import { LocalUser } from '../models/local_user';
import { JwtHelper } from 'angular2-jwt';
import { UsuarioService } from './domain/usuario.service';
import { LocalProfile } from '../models/local_profile';

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();
    email: string;

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public usuarioService: UsuarioService){

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

        let user: LocalUser = {
            token: tok,
            email: this.email,
        };
        this.storage.setLocalUser(user);
        this.setPerfis(this.email);
    };

    setPerfis(email: string)
    {   
        this.usuarioService.findByEmail(email)
        .subscribe(response => {

          let profile: LocalProfile = {
            perfis: response.perfis
          };

          this.storage.setLocalPerfis(profile);
        }, error => {});
    }

    logout()
    {
        this.storage.setLocalUser(null);
        this.storage.setLocalPerfis(null);
    };

    refreshToken()
    {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,
                                { },
                                {
                                    observe: 'response',
                                    responseType: 'text'
                                });
    };

}