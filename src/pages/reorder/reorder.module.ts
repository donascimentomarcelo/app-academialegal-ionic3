import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReorderPage } from './reorder';

@NgModule({
  declarations: [
    ReorderPage,
  ],
  imports: [
    IonicPageModule.forChild(ReorderPage),
  ],
})
export class ReorderPageModule {}
