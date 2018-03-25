import { API_CONFIG } from './../../config/api.config';
import { UsuarioDTO } from './../../models/usuario.dto';
import { UsuarioService } from './../../services/domain/usuario.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

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
    public usuarioService: UsuarioService) { }

  ionViewDidLoad() 
  {
      this.usuarioService.findAll()
        .subscribe(response => {
          this.usuarios = response['content'];
          this.total = response['content'].length
        }, error => {});
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

};
