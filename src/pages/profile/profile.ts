import { UsuarioService } from './../../services/domain/usuario.service';
import { API_CONFIG } from './../../config/api.config';
import { UsuarioDTO } from './../../models/usuario.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  usuario: UsuarioDTO;
  bucketUrl = API_CONFIG.bucketBaseUrl;
  picture: string;
  cameraOn: boolean = false;
  profileImage;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public storage: StorageService,
      public usuarioService: UsuarioService,
      public loadingCtrl: LoadingController,
      public camera: Camera,
      public sanitizer: DomSanitizer,
      public events: Events) 
      {
        this.profileImage = 'assets/imgs/avatar-blank.png';
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
        this.blobToDataURL(response).then(dataurl => {
          let str: string = dataurl as string
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
          this.events.publish('changedImageProfile');
        })
      },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png';
      loader.dismiss();
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

  presentLoading()
  {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return loader;
  };

  getCameraPicture()
  {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false; 
    });
  };

  sendPicture()
  {
    let loader = this.presentLoading();
    this.usuarioService.uploadPicture(this.picture)
      .subscribe(response => {
        loader.dismiss();
        this.picture = null;
        this.getImageIfExist();
      },
    error => {
      loader.dismiss();
    });
  };

  cancel()
  {
    this.picture = null;
  };

  getGalleryPicture()
  {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {

    this.picture = 'data:image/png;base64,' + imageData;
    this.cameraOn = false; 
    }, (error) => {
      this.cameraOn = false; 
    });
  };

  doRefresh(refresher) {
    this.ionViewDidLoad();
    this.getImageIfExist();
    this.events.publish('changedImageProfile');
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  };

};
  
  

