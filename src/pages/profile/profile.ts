import { UsuarioService } from './../../services/domain/usuario.service';
import { API_CONFIG } from './../../config/api.config';
import { UsuarioDTO } from './../../models/usuario.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  usuario: UsuarioDTO;
  bucketUrl = API_CONFIG.bucketBaseUrl;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public storage: StorageService,
      public usuarioService: UsuarioService,
      public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if(localUser && localUser.email)
    {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
          this.getImageIfExist();
        },
         error => {
           if(error.status == 403)
           {
             this.navCtrl.setRoot('HomePage');
           }
         });
    }
    else
    {
      this.navCtrl.setRoot('HomePage');
    };
  };

  getImageIfExist() {
    let loader = this.presentLoading();
    this.usuarioService.getImageBucket(this.usuario.id)
      .subscribe(response => {
        loader.dismiss();
        this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
      },
    error => {
      loader.dismiss();
    });
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
