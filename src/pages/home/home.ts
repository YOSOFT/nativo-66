import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleMap, GoogleMaps, GoogleMapOptions } from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imagenCamara;
  mapa: GoogleMap;

  constructor(
    public navCtrl: NavController,
    private camara: Camera
  ) {

  }

  ionViewDidLoad(){
    this.cargarMapa();
  }

  cargarMapa(){
    let opcionesMapa: GoogleMapOptions = {
        camera: {
          zoom: 18,
          target: {
            lat: 4.6810175,
            lng: -74.0478558
          },
          tilt: 30
        }
    } ;
    this.mapa = GoogleMaps.create('mapa', opcionesMapa);
  }
  tomarFoto(){
    let opciones: CameraOptions = {
      quality:100,
      encodingType: this.camara.EncodingType.JPEG,
      destinationType: this.camara.DestinationType.DATA_URL,
      mediaType: this.camara.MediaType.PICTURE,
      sourceType: this.camara.PictureSourceType.CAMERA
    };
    this.camara.getPicture(opciones).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imagenCamara = base64Image;
     }, (err) => {
      // Handle error
     });
  }

}
