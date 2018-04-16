import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardService } from '../../services/domain/dashboard.service';

@IonicPage()
@Component({
  selector: 'page-dashboard-admin',
  templateUrl: 'dashboard-admin.html',
})
export class DashboardAdminPage {

  adminDash: number;
  alunoDash: number;
  profDash: number;
  hipDash: number;
  defDash: number;
  resDash: number;
  outDash: number;
  penDash: number;
  rejDash: number;
  conDash: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dash: DashboardService) {}

  ionViewDidLoad() 
  {
    this.loadUser();
    this.loadSerie();
    this.loadSolicitacao();
  };

  loadUser()
  {
    this.dash.userDash()
    .subscribe(response => {
      var userDash: any = {};
      for(var i = 0; i < response.length; i++)
      {
        userDash[response[i].perfil] = response[i].qtddUsuario
      };
      
      this.adminDash = userDash.Admin;
      this.profDash = userDash.Professor;
      this.alunoDash = userDash.Aluno;
 
    }, error => { });
  };
  
  loadSerie()
  {
    this.dash.serieDash()
      .subscribe(response => {
        var serieDash: any = {};
        for(var i= 0; i<response.length; i++)
        {
          serieDash[response[i].tipoSerie] = response[i].qtddSerie
        };

        this.hipDash = serieDash.Hipertrofia;
        this.defDash = serieDash.Definicao;
        this.resDash = serieDash.Resistencia;
        this.outDash = serieDash.Outros;

      }, error => { });
  };

  loadSolicitacao()
  {
    this.dash.solicitacaoDash()
      .subscribe(response => {
        var solicitacaoDash: any = {};
        for(var i = 0; i<response.length; i++)
        {
          solicitacaoDash[response[i].statusSolicitacao] = response[i].qtddSolicitacao
        };

        this.penDash = solicitacaoDash.Pendente;
        this.rejDash = solicitacaoDash.Rejeitado;
        this.conDash = solicitacaoDash.Concluido;
        
      }, error => { });
  };

}
