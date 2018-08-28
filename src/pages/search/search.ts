import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { hymns } from '../hymns';
import { HymnsPage } from '../hymns/hymns';
import { Storage } from '@ionic/storage'




interface hym {
  number: number
  title: string
  body: string
}


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage {
  hymPage = HymnsPage;

  items: Array<hym>
  hy: any
  multiHy: any

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  public goToOtherPage(numb: number): void {
    localStorage.setItem("__wholeHymn", JSON.stringify(numb))
    //// for storage
    /*    var conf = {
          name: 'hymbook',
          storeName: 'localStorage',
          driverOrder: ["number", "title"]
        }
        var db = new Storage(conf)
    
        db.set("hymNumb", numb).then(()=>{
          console.log("Set hymn Number");
        }).catch(reason => console.log(reason))
    
        console.log("db Hymn Number", db.get("hymNumb"))
        */
    ///
    this.navCtrl.push(this.hymPage);
  }

  private showAlert(): void {
    const alert = this.alertCtrl.create({
      title: 'Not Found!',
      subTitle: 'We can\'t find a midi that matches the requested query string',
      buttons: ['OK']
    });
    alert.present();
  }

  initializeItems() {
    this.items = hymns
  }


  getItems(ev: any) {
    this.initializeItems();

    // not valid until callback is returned
    var __defaults = {
      number: 0o0,
      title: 'No song for now',
      body: 'There is no song that matches the query string <br/> please retry with a number from /[0-9]+/ that best suits you.'
    }

    // set val to the value of the searchbar
    const val: any = ev.target.value,
      stringVal: string = val,
      numVal: number = parseInt(val)
      ;
    var stringRegex = new RegExp(/[a-z, A-Z]+/)
    var numberRegex = new RegExp(/[0-9]+/)

    // might be an easier way to use this group of functions
    if (stringRegex.test(val)) {
      console.log("Using string pattern to search..");
      if (val && val.trim() != '') {
        var obj: hym[] = this.items.filter((obj: hym): hym | boolean => {
          var result = obj.title.toLowerCase().includes(stringVal.toLowerCase())
          return result
        });
        this.multiHy = obj || __defaults
        this.hy = undefined
        return obj;
      }
    }

    if (numberRegex.test(val)) {
      console.log("Using number pattern to search..")
      if (val && val.trim() != '') {
        var hymnNum = numVal;
        var _obj = this.items.filter(obj => {
          return obj.number === hymnNum;
        })[0];
        this.hy = _obj || __defaults
        return _obj;
      }
    }

    /**/
  }

  // debug
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
