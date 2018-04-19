import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SolicitacaoService } from '../../services/domain/solicitacao.service';
import { SolicitacaoDTO } from '../../models/solicitacao.dto';
import { trigger, transition, animate, style, state, keyframes } from '@angular/animations'
import { Solicitacao_identificator } from '../../models/solicitacao_identificator';
import { CheckRoleService } from '../../services/check-role.service';


@IonicPage()
@Component({
  selector: 'page-solicitacao-details',
  templateUrl: 'solicitacao-details.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ],
})
export class SolicitacaoDetailsPage {

  codigo = this.navParams.get('id');
  solicitacao: SolicitacaoDTO;
  accordionDescricao = 'accordion';
  accordionJustificativa = 'justificativa';
  professor: boolean = false;
  perfis: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public solicitacaoService: SolicitacaoService,  
      public storage: StorageService,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public checkRoleService: CheckRoleService) 
      {
        this.perfis = this.storage.getLocalPerfis().perfis;

        if(this.perfis)
        {
          if(this.perfis.includes("PROFESSOR"))
          {
            this.professor = true;
            
          };

        };
      }

  ionViewDidLoad() {
    this.solicitacaoService.findOne(this.codigo)
      .subscribe(response => {
        this.solicitacao = response;
      }, error => {
        this.checkRoleService.handler403(error);
      });
  };

  shownGroup = null;
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = !this.shownGroup;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };

  rejectPrompt(id: string) {
    let alert = this.alertCtrl.create({
      title: 'Insira uma justificativa!',
      subTitle: 'Insira uma justificativa para que a solicitação seja rejeitada.',
     
      inputs: [
        {
          name: 'justificativa',
          placeholder: 'Justificativa',
          label: 'dark'
        }
      ],
      buttons: [
        
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Rejeitar',
          handler: data => {
            this.rejectOk(id,data);
          }
        }
      ]
    });
    alert.present();
  };

  rejectOk(id: string, data: string)
  {
    let loader = this.presentLoading();
    this.solicitacaoService.reject(id, data)
      .subscribe(response => {
        loader.dismiss();
        this.navCtrl.pop();
      }, error => {
        loader.dismiss();
        this.checkRoleService.handler403(error);
      });
  };

  createNewSerie(id: string, solicitante: string)
  {
    let solicitacaoId = this.storage.getSolicitacao()
    
    if(solicitacaoId)
    {
      this.ifSolicitacaoExist(id, solicitante);
    }
    else
    {
      this.createSerie(id, solicitante);
    };
  };

  aletCreatingSerie(solicitante: string)
  {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: 'Agora você estará montando a série do aluno(a) ' + solicitante,
      buttons: ['Entendi']
    });
    alert.present();
  };

  ifSolicitacaoExist(id: string, solicitante: string) {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      message: 'Você começou a criar uma série e não finalizou. Se confirmar a serie anterior irá ser apagada',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Criar nova',
          handler: () => {
            this.createSerie(id, solicitante);
          }
        },
        {
          text: 'Voltar para antiga',
          handler: () => {
            this.navCtrl.setRoot('GrupoPage');
          }
        }
      ]
    });
    alert.present();
  };

  createSerie(id: string, solicitante: string)
  {
    let sol: Solicitacao_identificator = {
      id: id
    };
    this.storage.setSolicitacao(null);
    this.storage.setCart(null);
    this.storage.setSolicitacao(sol);
    this.aletCreatingSerie(solicitante);
    this.navCtrl.setRoot('GrupoPage');
  };

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };
}
