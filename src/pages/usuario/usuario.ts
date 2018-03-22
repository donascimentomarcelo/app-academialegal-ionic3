import { UsuarioDTO } from './../../models/usuario.dto';
import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  usuarios: UsuarioDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService) { }

  ionViewDidLoad() 
  {
      this.usuarioService.findAll()
        .subscribe(response => {
          this.usuarios = response['content'];
        }, error => {});
  };

};
