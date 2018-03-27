import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SolicitacaoService } from '../../services/domain/solicitacao.service';
import { SolicitacaoDTO } from '../../models/solicitacao.dto';
import { trigger, transition, animate, style, state, keyframes } from '@angular/animations'


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
      public storage: StorageService) 
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
      }, error => {});
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

}
