import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminExercicioPage } from './admin-exercicio';

@NgModule({
  declarations: [
    AdminExercicioPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminExercicioPage),
  ],
})
export class AdminExercicioPageModule {}
