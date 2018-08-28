import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, LoadingController } from 'ionic-angular';

const APP_VERSION: number = 1.0
// let's fake the server
const SERVER_VERSION: number = 1.0

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private bibleText: string = 'Genesis 2:4' 

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController) {
    this.alertCtrl = alertCtrl;
    this.loadingCtrl = loadingCtrl;
    this.navCtrl = navCtrl
    //////////////////
    if (APP_VERSION !== SERVER_VERSION) {
      this.showUpdate()
    }

  }

  /**
   * readBib
   */
  public readBib(s?: any): void {
    console.log("Reading now!", s)
  }
  public showUpdate(): void {
    var up = this.alertCtrl.create({
      title: 'Update App?',
      message: 'Do you agree to download and update this app? this app is completely free of charge and publicly made available',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.presentLoading();
          }
        }
      ]
    });
    up.present()
  }

  public presentLoading(): void {
    const loader = this.loadingCtrl.create({
      content: "Requesting device id from server..",
      duration: 4000
    });
    loader.present();
  }
}
