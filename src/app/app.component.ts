import { UsuarioDTO } from './../models/usuario.dto';
import { StorageService } from './../services/storage.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioService } from '../services/domain/usuario.service';
import { API_CONFIG } from '../config/api.config';
import { AuthService } from '../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  usuario: UsuarioDTO;
  perfis: any;
  rootPage: string = 'HomePage';
  profileImage;

  pages: Array<{title: string, component: string}>;

  constructor(
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen,
      public storage: StorageService,
      public usuarioService: UsuarioService,
      public authService: AuthService,  
      public sanitizer: DomSanitizer,
      public events: Events,
      private network: Network,
      public toast: ToastController) 
      {
        this.initializeApp();

        this.pages = [];
        
        this.loadSideMenu();

        events.subscribe('changedImageProfile',() =>{
          this.getImageIfExist();
        });

        this.profileImage = 'assets/imgs/avatar-blank.png';
      };

  loadSideMenu()
  {
    let localUser = this.storage.getLocalUser();
    
    if(localUser && localUser.email)
    {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {

          this.usuario = response;

          this.getImageIfExist();

          this.perfis = response.perfis;

          if(this.perfis)
          {
            if(this.perfis.includes("ADMIN"))
            {
              this.pages.push(
                { title: 'Home', component: 'DashboardAdminPage'},
                { title: 'Perfil', component: 'ProfilePage'},
                { title: 'Todos os Exercícios', component: 'AdminExercicioPage'},
                { title: 'Todas as Solicitações', component: 'AdminSolicitacoesPage'},
                { title: 'Todas as Séries', component: 'AdminSeriesPage'},
                { title: 'Todos os Usuários', component: 'UsuarioPage'},
                { title: 'Logout', component: '' },
              )
            }
            else if(this.perfis.includes("ALUNO") && !this.perfis.includes("PROFESSOR"))
            {
              this.pages.push(
                { title: 'Home', component: 'DashboardAlunoPage'},
                { title: 'Perfil', component: 'ProfilePage'},
                { title: 'Minhas solicitações', component: 'SolicitacoesPage'},
                { title: 'Minhas séries', component: 'SeriePage'},
                { title: 'Logout', component: '' },
              )
            }
            else if(this.perfis.includes("PROFESSOR") && !this.perfis.includes("ALUNO"))
            {
              this.pages.push(
                { title: 'Home', component: 'DashboardAdminPage'},
                { title: 'Perfil', component: 'ProfilePage'},
                { title: 'Todas as Solicitações', component: 'AdminSolicitacoesPage'},
                { title: 'Todas as Séries', component: 'AdminSeriesPage'},
                { title: 'Logout', component: '' },
              )
            }
            else if(this.perfis.includes("PROFESSOR") && this.perfis.includes("ALUNO"))
            {
              this.pages.push(
                { title: 'Home', component: 'DashboardAdminPage'},
                { title: 'Perfil', component: 'ProfilePage'},
                { title: 'Minhas solicitações', component: 'SolicitacoesPage'},
                { title: 'Minhas séries', component: 'SeriePage'},
                { title: 'Todas as Solicitações', component: 'AdminSolicitacoesPage'},
                { title: 'Todas as Séries', component: 'AdminSeriesPage'},
                { title: 'Logout', component: '' },
              )
            }
          };
        }, error => {});
      
    }
  };

  getImageIfExist() {
    this.usuarioService.getImageBucket(this.usuario.id)
      .subscribe(response => {
         this.usuario.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.usuario.id}.jpg`;
         this.blobToDataURL(response).then(dataurl => {
          let str: string = dataurl as string
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        })
      },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png';
    });
  };

   blobToDataURL(blob) {
       return new Promise((fulfill, reject) => {
          let reader = new FileReader();
          reader.onerror = reject;
          reader.onload = (e) => fulfill(reader.result);
          reader.readAsDataURL(blob);
        });
    };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.network.onDisconnect().subscribe(() => {
        this.toast.create({
          message:'Sem conexão à internet',
          duration: 5000
        }).present();
      });    
      
      this.network.onConnect().subscribe(() => {
        this.toast.create({
          message:'Conectado à internet',
          duration: 3000
        }).present();
      });

    });
  }

  openPage(page : {title:string, component:string}) {

    switch (page.title)
    {
      case 'Logout':
      this.authService.logout();
      this.nav.setRoot('HomePage');
      this.setPage();
      break;

      default:
      this.nav.setRoot(page.component);
    };
  };

  setPage()
  {
    delete this.pages;
    this.pages = [];
  };

}
