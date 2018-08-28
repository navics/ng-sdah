import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HymnsPage } from './hymns';

@NgModule({
  declarations: [
    HymnsPage,
  ],
  imports: [
    IonicPageModule.forChild(HymnsPage),
  ],
})
export class HymnsPageModule {}
