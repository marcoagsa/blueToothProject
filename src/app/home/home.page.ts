import { Component } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  items = [];
  constructor(
    public loadingController: LoadingController,
    public platform: Platform) {}

  async scan(): Promise<void> {
    this.presentLoading();
    try {
      this.items = [];
      await BleClient.initialize();

      await BleClient.requestLEScan(
        {
          services: [],
        },
        (result) => {
          // this.items.push(result.device);
          this.items.push(result);
        }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('stopped scanning');
        console.error('this.items', this.items);
      }, 5000);

    } catch (error) {
      console.error('Entrei aqui', error);
    }
  }



  async connectDevice(device: any): Promise<void>  {
    const message = 'connected to device';
    this.presentLoading(message);
    try {
      await BleClient.initialize();

      // const deviceTTT = await BleClient.requestDevice({
      //   services: [],
      //   optionalServices: [],
      // });

      const tt = await BleClient.requestDevice();
      console.log('xupa deviceTTT', tt);


      // if (this.platform.is('android')){
      //   const bond = await BleClient.createBond(device);
      // }

      const connectDevice = await BleClient.connect(device, (result) => {
         if (result) {
          console.log('xupa result', result);
         }
      });

      console.log('xupa connectDevice', connectDevice);

      // const getDevices = await BleClient.getDevices([]);

      // console.log('xupa getDevices', getDevices);
    //  this.items = await BleClient.getConnectedDevices([HEART_RATE_SERVICE]);
    //  console.log('this.items 1', this.items);

    //  this.items = await BleClient.getConnectedDevices([]);
    //  console.log('this.items 2', this.items);

      // const result = await BleClient.read(deviceID, HEART_RATE_SERVICE, BODY_SENSOR_LOCATION_CHARACTERISTIC);
      // console.log('body sensor location', result.getUint8(0));

      // const battery = await BleClient.read(deviceID, BATTERY_SERVICE, BATTERY_CHARACTERISTIC);
      // console.log('battery level', battery.getUint8(0));

      // await BleClient.write(deviceID, POLAR_PMD_SERVICE, POLAR_PMD_CONTROL_POINT, numbersToDataView([1, 0]));
      // console.log('written [1, 0] to control point');

      setTimeout(async () => {
        this.scan();
      }, 10000);
    } catch (error) {
      console.error('Entrei aqui', error);
    }
  }

  async presentLoading(message?: string) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message || 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  parseHeartRate(value: DataView): number {
    const flags = value.getUint8(0);
    // eslint-disable-next-line no-bitwise
    const rate16Bits = flags & 0x1;
    let heartRate: number;
    if (rate16Bits > 0) {
      heartRate = value.getUint16(1, true);
    } else {
      heartRate = value.getUint8(1);
    }
    return heartRate;
  }

  async main(): Promise<void> {
    try {
      await BleClient.initialize();

      const device = await BleClient.requestDevice({
        services: [],
        optionalServices: [],
      });

      await BleClient.connect(device.deviceId);

      // const result = await BleClient.read(device.deviceId, HEART_RATE_SERVICE, BODY_SENSOR_LOCATION_CHARACTERISTIC);
      // console.log('body sensor location', result.getUint8(0));

      // const battery = await BleClient.read(device.deviceId, BATTERY_SERVICE, BATTERY_CHARACTERISTIC);
      // console.log('battery level', battery.getUint8(0));

      // await BleClient.write(device.deviceId, POLAR_PMD_SERVICE, POLAR_PMD_CONTROL_POINT, numbersToDataView([1, 0]));
      // console.log('written [1, 0] to control point');

      // await BleClient.startNotifications(
      //   device.deviceId,
      //   HEART_RATE_SERVICE,
      //   HEART_RATE_MEASUREMENT_CHARACTERISTIC,
      //   (value) => {
      //     console.log('current heart rate', this.parseHeartRate(value));
      //   }
      // );

      setTimeout(async () => {
        // await BleClient.stopNotifications(device.deviceId, HEART_RATE_SERVICE, HEART_RATE_MEASUREMENT_CHARACTERISTIC);
        // await BleClient.disconnect(device.deviceId);
        // console.log('disconnected from device', device);
      }, 10000);
    } catch (error) {
      console.error(error);
    }
  }


}
