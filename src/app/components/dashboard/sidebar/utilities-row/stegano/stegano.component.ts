import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EncodeService} from "../../../../../services/stegano/encode.service";
import {toBitArray, toByteArray, toNormalizedArray, toSteganoArray} from "../../../../../services/stegano/transformer";
import {fromByteArray} from "base64-js";
import {doc} from "@angular/fire/firestore";
import {log} from "util";

// @ts-ignore

@Component({
  selector: 'app-stegano',
  templateUrl: './stegano.component.html',
  styleUrls: ['./stegano.component.css']
})
export class SteganoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private encode: EncodeService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      image: null,
      text: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  create() {
    const newText = this.form.value.text
    const byteText = toBitArray(newText)
    const reader = new FileReader()
    let imgBlob: any = null
    let finalImage: any = null
    // @ts-ignore
    let f = document.getElementById('upload_file').files[0]
    if (f) {
      reader.onloadend = async function (e) {
        // @ts-ignore
        document.getElementById("img").src = e.target.result
        if (reader.DONE) imgBlob = e.target!.result!.toString().split(',')[1]
        const slicedArrayImage = imgBlob.substring(25 + byteText.length)
        //console.log(slicedArrayImage.length)
        const byteImage = toByteArray(slicedArrayImage)
        const nonSteganoImage = imgBlob.substring(byteText.length - 1)
        //console.log(nonSteganoImage)
        const normalizedArrayImage = toNormalizedArray(byteImage)
        const steganoArrayImage = toSteganoArray(byteText, normalizedArrayImage)
        const asciiImage = steganoArrayImage.map((byte) => parseInt(byte, 2))
        let byteStuff = fromByteArray(Uint8Array.from(asciiImage)).slice(0, -2)
        console.log(nonSteganoImage)
        finalImage = "data:image/png;base64," + "iVBORw0KGgoAAAANSUhEUgAAB" + byteStuff + nonSteganoImage
        console.log(finalImage)
        // @ts-ignore
        await (document.getElementById("img2").src = finalImage)
      }
      reader.readAsDataURL(f)
    }
  }
}
