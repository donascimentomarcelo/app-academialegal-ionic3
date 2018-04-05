import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuarioService } from './../../services/domain/usuario.service';
import { UsuarioDTO } from './../../models/usuario.dto';
import { API_CONFIG } from '../../config/api.config';
import { PerfilService } from '../../services/domain/perfil.service';

@IonicPage()
@Component({
  selector: 'page-perfis',
  templateUrl: 'perfis.html',
})
export class PerfisPage {

  usuario: UsuarioDTO;
  perfilValue: number;
  perfil: number;
  codigo: string = this.navParams.get('id');
  bucketUrl = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public perfilService: PerfilService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let id = this.codigo;
    let loader = this.presentLoading();
    this.usuarioService.findOne(id)
      .subscribe(response => {
        loader.dismiss();
        this.usuario = response;
        this.getImageIfExist(response.id)
      }, erros => {
        loader.dismiss();
      });
  };

  getImageIfExist(id: string) {
    this.usuarioService.getImageBucket(id)
      .subscribe(response => {
         this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
      },
    error => {});
  };

  delete( perfil: string, id: string) {
    let loader = this.presentLoading();
    this.perfilValue = this.convertPerfilToNumber(perfil);
     this.perfilService.remove(this.perfilValue, id)
      .subscribe(response => {
        loader.dismiss();
        this.loadPerfil(id)
        this.usuario.perfis.length = this.usuario.perfis.length - 1;
      }, error => {
        loader.dismiss();
      });
  };

  convertPerfilToNumber(perfil: string)
  {
    switch(perfil)
    {
      case 'ADMIN':
      return 1;

      case 'ALUNO':
      return 2;

      case 'PROFESSOR':
      return 3;
    };
  };

  add(id: string)
  {
    let loader = this.presentLoading();
    this.perfilService.add(this.perfil, id)
      .subscribe(response => {
        loader.dismiss();
        this.loadPerfil(id);
      }, error => {
        loader.dismiss();
      });
  };


  loadPerfil(id) {

    this.usuarioService.findOne(id)
      .subscribe(response => {
        this.usuario.perfis = response.perfis;
        this.usuario.perfis.length + 1;
        delete this.perfil;
      }, erros => {});
  };

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };

};
