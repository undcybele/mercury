import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodeService {

  constructor() {
  }

  originalImage!: File
  password = 0
  text = ''
  imageSize = 0
  textSize = 0
  normalizedImage = ''

  encode(image: File) {
    console.log(image.size)

  }


}
