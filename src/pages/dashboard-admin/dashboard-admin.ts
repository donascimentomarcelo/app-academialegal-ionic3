import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardService } from '../../services/domain/dashboard.service';
import { Chart } from 'chart.js';
import { CheckRoleService } from '../../services/check-role.service';

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
  chartSolicitacoes = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dash: DashboardService,
    public checkRole: CheckRoleService) 
    {
      this.checkRole.checkPerfilAdminProf();
    }

  ionViewDidLoad() 
  {
    this.loadUser();
    this.loadSerie();
    this.loadSolicitacao();
  };

  @ViewChild('pieCanvasUsuario') pieCanvasUsuario;
  pieChartUsuario: any;
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

      let qtdd = response.map(response => response.qtddUsuario)
      let perfil = response.map(response => response.perfil)
      
      this.pieChartUsuario = new Chart(this.pieCanvasUsuario.nativeElement, {
        type: 'pie',
        data: {
          labels: perfil,
          datasets: [
            {
              label: '# quantidade',
              data: qtdd,
              backgroundColor: [
              'rgba(0, 0, 0, 1)',
              'rgba(0, 0, 0, 0.7)',
              'rgba(0, 0, 0, 0.4)',
              'rgba(71, 69, 69, 1)',
              'rgba(71, 69, 69, 0.8)',
              'rgba(71, 69, 69, 0.6)'
            ],
              hoverBackgroundColor: [
                "#000000",
                "#C0C0C0",
                "#808080",
                "#000000",
                "#C0C0C0",
                "#808080"
            ]
            }
          ]
        }
      })
    }, error => { });
  };
  
  @ViewChild('pieCanvasSerie') pieCanvasSerie;
  pieChartSerie: any;
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

        let qtdd = response.map(response => response.qtddSerie)
        let tipo = response.map(response => response.tipoSerie)
        
        this.pieChartSerie = new Chart(this.pieCanvasSerie.nativeElement, {
          type: 'pie',
          data: {
            labels: tipo,
            datasets: [
              {
                label: '# quantidade',
                data: qtdd,
                backgroundColor: [
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 0.7)',
                'rgba(0, 0, 0, 0.4)',
                'rgba(71, 69, 69, 1)',
                'rgba(71, 69, 69, 0.8)',
                'rgba(71, 69, 69, 0.6)'
              ],
                hoverBackgroundColor: [
                  "#000000",
                  "#C0C0C0",
                  "#808080",
                  "#000000",
                  "#C0C0C0",
                  "#808080"
              ]
              }
            ]
          }
        })
      }, error => { });
  };

  @ViewChild('pieCanvasSolicitacao') pieCanvasSolicitacao;
  pieChartSolicitacao: any;
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

        let qtdd = response.map(response => response.qtddSolicitacao)
        let status = response.map(response => response.statusSolicitacao)
        
        this.pieChartSolicitacao = new Chart(this.pieCanvasSolicitacao.nativeElement, {
          type: 'pie',
          data: {
            labels: status,
            datasets: [
              {
                label: '# quantidade',
                data: qtdd,
                backgroundColor: [
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 0.7)',
                'rgba(0, 0, 0, 0.4)',
                'rgba(71, 69, 69, 1)',
                'rgba(71, 69, 69, 0.8)',
                'rgba(71, 69, 69, 0.6)'
              ],
                hoverBackgroundColor: [
                  "#000000",
                  "#C0C0C0",
                  "#808080",
                  "#000000",
                  "#C0C0C0",
                  "#808080"
              ]
              }
            ]
          }
        })
      }, error => { });
  };

}
