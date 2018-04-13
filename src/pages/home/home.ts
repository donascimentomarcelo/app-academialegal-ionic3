import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, LoadingController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


creds: CredenciaisDTO = {
    email: "",
    senha: "" 
};

  constructor(
    public navCtrl: NavController,
    public sideMenu: MenuController,
    public authService: AuthService,
    public myApp: MyApp,
    public loadingCtrl: LoadingController,
    public usuarioService: UsuarioService,
    public storage: StorageService) {

  }

  login()
  {
    let loader = this.presentLoading();

    this.authService.authenticate(this.creds)
        .subscribe(response => {
          loader.dismiss();
          this.authService.successfulLogin(response.headers.get('Authorization'));
          this.loadSideMenu(this.creds.email);
          // this.navCtrl.setRoot('GrupoPage')
        }, error => {
          loader.dismiss();
        });
  };

  loadSideMenu(email: string)
  {
      this.usuarioService.findByEmail(email)
        .subscribe(response => {
          console.log(response.perfis);
          if(response.perfis.includes("ADMIN") || response.perfis.includes("PROFESSOR"))
          {
            this.navCtrl.setRoot('DashboardAdminPage')
          }
          else
          {
            this.navCtrl.setRoot('DashboardAlunoPage')
          }
        }, error => {});
  };

  ionViewWillEnter()
  {
    this.sideMenu.swipeEnable(false);
  }

  ionViewDidLeave()
  {
    this.sideMenu.swipeEnable(true);
    this.myApp.loadSideMenu();
  }

  ionViewDidEnter()
  {
    this.authService.refreshToken()
      .subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.myApp.setPage(); //setPage zera o menu para ser populado apenas após a verificação de perfil
        
        let user = this.storage.getLocalUser();
        this.loadSideMenu(user.email);
        // this.navCtrl.setRoot('GrupoPage');
      }, error => {});
  };

  signup()
  {
    this.navCtrl.push('SignupPage');
  };

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  }
}
