import { StorageService } from './../../services/storage.service';
import { API_CONFIG } from './../../config/api.config';
import { GrupoDTO } from './../../models/grupo.dto';
import { GrupoService } from './../../services/domain/grupo.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {

grupos: GrupoDTO[];
bucketUrl: string = API_CONFIG.bucketBaseUrl;
showMenuRedirectToGroupPage: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public grupoSercive: GrupoService,
    public storage: StorageService) {

    let solId = this.storage.getSolicitacao();

    if(solId)
    {
      this.showMenuRedirectToGroupPage = true;
    }
  }

  ionViewDidLoad() {
    this.grupoSercive.findAll()
      .subscribe(response => {
        this.grupos = response;
      }, error => {
        
      })
  };

  showExercicios(id: string)
  {
    this.navCtrl.push('ExercicioPage', {id: id});
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

  redirectToCartPage()
  {
    this.navCtrl.setRoot('CartPage');
  }

}
