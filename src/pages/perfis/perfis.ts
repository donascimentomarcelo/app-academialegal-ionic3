import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from './../../services/domain/usuario.service';
import { UsuarioDTO } from './../../models/usuario.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-perfis',
  templateUrl: 'perfis.html',
})
export class PerfisPage {

  usuario: UsuarioDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get('id');

    this.usuarioService.findOne(id)
      .subscribe(response => {
        this.usuario = response;
        this.getImageIfExist(response.id)
      }, erros => {});
  };

    getImageIfExist(id: string) {
    this.usuarioService.getImageBucket(id)
      .subscribe(response => {
         this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
      },
    error => {});
  };

  delete(chip: Element) {
    chip.remove();
  }

}
