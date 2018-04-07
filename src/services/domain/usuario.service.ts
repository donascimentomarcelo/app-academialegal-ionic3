import { UsuarioDTO } from './../../models/usuario.dto';
import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { ImageUtilService } from '../image-util.service';

@Injectable()
export class UsuarioService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public imageUtilService: ImageUtilService){

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

    findAll(page : number = 0, linesPerPage : number = 24): Observable<UsuarioDTO> 
    {
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios?page=${page}&linesPerPage=${linesPerPage}`);
    };
    
    findOne(id: string): Observable<UsuarioDTO> 
    {
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/${id}`);
    };

    findByName(nome: string): Observable<UsuarioDTO[]>
    {
        return this.http.get<UsuarioDTO[]>(`${API_CONFIG.baseUrl}/usuarios/name?name=${nome}`);
    };

    uploadPicture(picture)
    {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');

        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );

    }

};