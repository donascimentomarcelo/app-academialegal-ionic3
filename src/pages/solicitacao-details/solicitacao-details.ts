import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SolicitacaoService } from '../../services/domain/solicitacao.service';
import { SolicitacaoDTO } from '../../models/solicitacao.dto';

@IonicPage()
@Component({
  selector: 'page-solicitacao-details',
  templateUrl: 'solicitacao-details.html',
})
export class SolicitacaoDetailsPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public solicitacaoService: SolicitacaoService) {
  }

  codigo = this.navParams.get('id');
  solicitacao: SolicitacaoDTO;
  accordionDescricao = 'accordion';
  accordionJustificativa = 'justificativa';

  ionViewDidLoad() {
    this.solicitacaoService.findOne(this.codigo)
      .subscribe(response => {
        console.log(response);
        this.solicitacao = response;
      }, error => {});
  };

  shownGroup = null;
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
};
isGroupShown(group) {
    return this.shownGroup === group;
};

}
