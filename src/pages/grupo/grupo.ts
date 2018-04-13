//import { HomePage } from './../home/home';
import { StorageService } from './../../services/storage.service';
import { API_CONFIG } from './../../config/api.config';
import { GrupoDTO } from './../../models/grupo.dto';
import { GrupoService } from './../../services/domain/grupo.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, AlertController } from 'ionic-angular';
import { CheckRoleService } from '../../services/check-role.service';

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
    public storage: StorageService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public checkRoleService: CheckRoleService) {

    let solId = this.storage.getSolicitacao();

    if(solId)
    {
      this.showMenuRedirectToGroupPage = true;
    }
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.grupoSercive.findAll()
      .subscribe(response => {
        loader.dismiss();
        this.grupos = response;
      }, error => {
        loader.dismiss();
        if(error.status == 403)
        {
          this.checkRoleService.accessAllowed();
        }
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

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
      this.ionViewDidLoad();
    }, 2000);
  };

}
