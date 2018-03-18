import { API_CONFIG } from './../../config/api.config';
import { UsuarioDTO } from './../../models/usuario.dto';
import { StorageService } from './../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  usuario: UsuarioDTO;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public storage: StorageService,
      public usuarioService: UsuarioService) {
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
         error => {});
    };
  };

  getImageIfExist() {
    this.usuarioService.getImageBucket(this.usuario.id)
      .subscribe(response => {
         this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
      },
    error => {});
  };
  
}
