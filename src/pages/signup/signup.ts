import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,  
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['Manuel', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      email: ['manuel@gmail.com', [Validators.required, Validators.email]],
      senha: ['123456', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      repeteSenha: ['123456', [Validators.required]],
    }, {validator: this.matchingPasswords('senha', 'repeteSenha')});
  };

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  signupUser()
  {
    this.usuarioService.save(this.formGroup.value)
      .subscribe(response => {
      this.showInsertOk();
      }, error => {});
  };

  showInsertOk()
  {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro realizado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  };

}
