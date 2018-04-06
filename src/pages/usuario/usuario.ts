import { API_CONFIG } from './../../config/api.config';
import { UsuarioDTO } from './../../models/usuario.dto';
import { UsuarioService } from './../../services/domain/usuario.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  usuarios: UsuarioDTO[] = [];
  bucketUrl = API_CONFIG.bucketBaseUrl;
  search: string;
  page : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public loadingCtrl: LoadingController) { }

  ionViewDidLoad() 
  {
    let loader = this.presentLoading();
      this.usuarioService.findAll(this.page, 20)
        .subscribe(response => {
          loader.dismiss();
          this.usuarios = this.usuarios.concat(response['content']);
        }, error => {
          loader.dismiss();
        });
  };

  details(id: string)
  {
    this.navCtrl.push('PerfisPage', {id: id});
  };

  onInput(nome: string)
  {
    this.usuarioService.findByName(nome)
      .subscribe( response => {
        this.usuarios = response;
        if(nome.length == 0)
        {
          this.onClear();
        }
      }, error => {});
  };

  onClear()
  {   
    this.search = "";
    this.usuarios = [];
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

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };

  doRefresh(refresher) {
    this.search = "";
    this.page = 0;
    this.usuarios = [];
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  };

  doInfinite(infiniteScroll) 
  {
    this.page++;
    this.ionViewDidLoad();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  };

};
