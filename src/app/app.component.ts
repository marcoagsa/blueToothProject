import { Component } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Platform } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public bluetoothle: BluetoothLE,
    private platform: Platform,
    private bluetoothSerial: BluetoothSerial,
    ) {
      this.teste();
    }

    teste(): void {
      this.platform.ready().then((readySource) => {
        console.log('Platform ready from', readySource);
        this.bluetoothle.initialize().subscribe((res) => {
        });
       });
    }
}
