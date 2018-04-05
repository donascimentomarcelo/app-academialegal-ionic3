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

  usuarios: UsuarioDTO[];
  bucketUrl = API_CONFIG.bucketBaseUrl;
  search: string;
  total: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public loadingCtrl: LoadingController) { }

  ionViewDidLoad() 
  {
    let loader = this.presentLoading();
      this.usuarioService.findAll()
        .subscribe(response => {
          loader.dismiss();
          this.usuarios = response['content'];
          this.total = response['content'].length
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
        this.total = this.usuarios.length
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

};
