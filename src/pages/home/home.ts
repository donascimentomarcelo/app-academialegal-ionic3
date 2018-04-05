import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, LoadingController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

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
    public loadingCtrl: LoadingController) {

  }

  login()
  {
    let loader = this.presentLoading();

    this.authService.authenticate(this.creds)
        .subscribe(response => {
          loader.dismiss();
          this.authService.successfulLogin(response.headers.get('Authorization'));

          this.navCtrl.setRoot('GrupoPage')
        }, error => {
          loader.dismiss();
        });
  }

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
        this.myApp.setPage();
        this.navCtrl.setRoot('GrupoPage');
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
