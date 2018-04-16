import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardService } from '../../services/domain/dashboard.service';

@IonicPage()
@Component({
  selector: 'page-dashboard-aluno',
  templateUrl: 'dashboard-aluno.html',
})
export class DashboardAlunoPage {

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
    public dash: DashboardService) { }

  ionViewDidLoad() {
    this.loadMySerie();
    this.loadMySolicitacao();
  }

  loadMySerie()
  {
    this.dash.mySerieDash()
      .subscribe(response => {
        var serieDash: any = {};
        console.log(response);
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

  loadMySolicitacao()
  {
    this.dash.mySolicitacaoDash()
      .subscribe(response => {
        console.log(response);
        
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
