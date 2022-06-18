import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { combineLatest, forkJoin, map, Subject, take } from 'rxjs';
import { AuthtokenService } from './services/authtoken.service';
import { building } from './model/building';
import { signal } from './model/signal';
import { mappedData } from './model/mappedData';
import { signalValues } from './model/signalValues';
import { Subscription, timer } from 'rxjs';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.appName;
  token = "";
  buildings: Array<building> = [];
  buildingsMap: Map<number, string> = new Map<number, string>();
  signalsMap: Map<number, string> = new Map<number, string>();
  signalsValue: Array<signalValues> = [];
  mappedDataArray: Array<mappedData> = [];
  timerSubscription: Subscription;

  constructor(private datas: DataService, private authServ: AuthtokenService) {
  }


  async ngOnInit() {
    await this.getToken();
    this.getSignalsData();
    this.timerSubscription = timer(0, 10000).pipe(
      map(() => {
        this.getSignalValuesData();
      })
    ).subscribe();
  }

  async fetchData() {
    await this.getToken();
    this.getSignalsData();
    this.getSignalValuesData();
  }

  async getSignalsData() {
    this.signalsValue.length = 0;
    await this.getBuildings();
    for (let i = 0; i < this.buildings.length; i++) {
      let payload = '{"buildingId": ' + this.buildings[i].id + '}';
     await this.getSignals(payload);
    }
  }

  async getSignalValuesData() {
    this.signalsValue.length = 0;
    await this.getBuildings();
    for (let i = 0; i < this.buildings.length; i++) {
      let payload = '{"buildingId": ' + this.buildings[i].id + '}';
     await this.getSignalValues(payload);
    }
    this.prepareData();
  }

  public prepareData() {
    this.mappedDataArray.length = 0;
    this.signalsValue.forEach(element => {
      var readDate = new Date(element.readUtc).getTime();
      var aHourAgo = new Date().getTime() - (60 * 60 * 1000);
      if (aHourAgo < readDate) {
        var temp = new mappedData();
        temp.setSignalId(element.signalId);
        temp.setValue(element.value);
        temp.setReadUtc(element.readUtc.replace("T", " ").replace("Z",""));
        temp.setDataUtc(element.dataUtc);
        var signalName = this.signalsMap.get(element.signalId)
        if (signalName != undefined) {
          temp.setSignalName(signalName);
        }
        this.mappedDataArray.push(temp);
      }
    });
  }

  async getToken() {
    var data = await this.authServ.getToken().pipe(take(1)).toPromise();
    if (data != undefined)
      this.token = data.access_token;
  }

  async getBuildings() {
    var buildingsData = await this.datas.getBuildings(this.token).pipe(take(1)).toPromise().catch((err) => {
      if (err.status == 401) {
        this.fetchData();
      } else {
        console.log(err);
      }
    });

    if (buildingsData != undefined) {
      for (let i = 0; i < buildingsData.length; i++) {
        this.buildingsMap.set(buildingsData[i].id, buildingsData[i].name);
      }
      this.buildings = Array.from(buildingsData);
    }

  }
  async getSignals(payload: string) {
    var signalsData = await this.datas.getSignals(this.token, payload).pipe(take(1)).toPromise().catch((err) => {
      if (err.status == 401) {
        this.fetchData();
      } else {
        console.log(err);
      }
    });
    if (signalsData != undefined) {
      for (let i = 0; i < signalsData.length; i++) {
        this.signalsMap.set(signalsData[i].id, signalsData[i].name);
      }
    }
  }

  async getSignalValues(payload: string) {
    var signalsValueData = await this.datas.getSignalValues(this.token, payload).pipe(take(1)).toPromise().catch((err) => {
      if (err.status == 401) {
        this.fetchData();
      } else {
        console.log(err);
      }
    });;
    if (signalsValueData != undefined) {
      this.signalsValue.push(...Array.from(signalsValueData));
    }    
    
  }

}
