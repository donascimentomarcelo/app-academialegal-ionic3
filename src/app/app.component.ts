import { StorageService } from './../services/storage.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  email: string;
  image: string;
  nome: string;
  perfis: any;
  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public storage: StorageService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage'},
      { title: 'Perfil', component: 'ProfilePage'},
      
    ];
    
    this.loadSideMenu();
  }

  loadSideMenu()
  {
    let localUser = this.storage.getLocalUser();
    
    if(localUser && localUser.email)
    {
      this.email = localUser.email;
      this.image = localUser.imageUrl;
      this.nome = localUser.nome;
      this.perfis = localUser.perfis;
    }

    if(this.perfis)
    {
      if(this.perfis.includes("ADMIN"))
      {
        this.pages.push(
          { title: 'Grupo', component: 'GrupoPage'},
        )
      }
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
