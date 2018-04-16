import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { UsuarioDashboardDTO } from './../../models/usuario-dash.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SerieDashboardDTO } from '../../models/serie-dash.dto';
import { SolicitacaoDashboardDTO } from '../../models/solicitacao-dash.dto';

@Injectable()
export class DashboardService {

    constructor(public http: HttpClient){};

    userDash(): Observable<UsuarioDashboardDTO[]>
    {
        return this.http.get<UsuarioDashboardDTO[]>(`${API_CONFIG.baseUrl}/usuarios/dashboard`);
    };

    serieDash(): Observable<SerieDashboardDTO[]>
    {
        return this.http.get<SerieDashboardDTO[]>(`${API_CONFIG.baseUrl}/series/dashboard`);
    };

    solicitacaoDash(): Observable<SolicitacaoDashboardDTO[]>
    {
        return this.http.get<SolicitacaoDashboardDTO[]>(`${API_CONFIG.baseUrl}/solicitacoes/dashboard`);
    };
    
    mySerieDash(): Observable<SerieDashboardDTO[]>
    {
        return this.http.get<SerieDashboardDTO[]>(`${API_CONFIG.baseUrl}/series/myDashboard`);
    };

    mySolicitacaoDash(): Observable<SolicitacaoDashboardDTO[]>
    {
        return this.http.get<SolicitacaoDashboardDTO[]>(`${API_CONFIG.baseUrl}/solicitacoes/myDashboard`);
    };

}