import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public perfilService: PerfilService) {
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

  delete(chip: Element, perfil: string, id: string) {
    this.perfilValue = this.convertPerfilToNumber(perfil);
     this.perfilService.remove(this.perfilValue, id)
      .subscribe(response => {
        chip.remove();
      }, error => {});
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

};
