import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { hym } from '../hymns';

@IonicPage()
@Component({
  selector: 'page-hymns',
  templateUrl: 'hymns.html'
})

export class HymnsPage {
  /**
   * @description `SYNTAIC SUGAR!`
   */
  /////////////////////////////
  public wholeHymn: hym ///////
  public midiUrl: string //////
  public _midiNumber: string //
  /////////////////////////////

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.wholeHymn = JSON.parse(localStorage.getItem("__wholeHymn"))
    this._midiNumber = this.resolveZero(this.wholeHymn.number);
    this.midiUrl = `../../assets/midi/${this._midiNumber}.mid`
  }
  /**
   * @description This appends `0` or `00` to match the `midi` destinations
   * @param what 
   */
  public resolveZero(what: any): string {
    if (what < 99 && what > 10) {
      return "0" + what
    } else if (what < 10) {
      return "00" + what
    } else {
      return what
    }
  }

  public playMidi(): void {
    var $LA1: any = document.getElementById("audioMidi");
    $LA1.play()
  }


  ionViewDidLoad(): void {
    console.log(this.midiUrl);
    console.log("Loaded HymsPage!")
  }
}
