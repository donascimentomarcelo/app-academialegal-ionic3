import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      nome: ['Manuel', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      email: ['manuel@gmail.com', [Validators.required, Validators.email]],
      senha: ['123456', [Validators.required]],
      repeteSenha: ['123456', [Validators.required]],

    });
  }



  signupUser()
  {
    console.log(this.formGroup.value);
  };

}
