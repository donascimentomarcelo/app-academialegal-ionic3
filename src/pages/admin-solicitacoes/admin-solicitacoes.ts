import { SolicitacaoService } from './../../services/domain/solicitacao.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { SolicitacaoDTO } from '../../models/solicitacao.dto';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-admin-solicitacoes',
  templateUrl: 'admin-solicitacoes.html',
})
export class AdminSolicitacoesPage {

  solicitacoes: SolicitacaoDTO[];
  search: string;
  total: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public solicitacaoService: SolicitacaoService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    this.solicitacaoService.findAll()
      .subscribe(response => {
        this.solicitacoes = response['content'];
        this.total = response['content'].length;
      }, error => {});
  };

  onInput(solicitante)
  {
    this.solicitacaoService.findBySolicitante(solicitante)
      .subscribe(response => {
        this.solicitacoes = response;
        this.total = response.length
      }, error => {});
  };

  onClear()
  {   
    this.search = "";
    this.ionViewDidLoad();
  };

  @ViewChild(Content) content: Content;

  scrollToTop() 
  {
    this.content.scrollToTop();
  };

  scrollToBottom() 
  {
    this.content.scrollToBottom();
  };

  details(id: string)
  {
    this.navCtrl.push('SolicitacaoDetailsPage', {id: id});
    
  }

}
