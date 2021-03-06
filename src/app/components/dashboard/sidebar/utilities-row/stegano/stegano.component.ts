import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {encode} from "../../../../../stegano/imageEncoder";
import {decode} from "../../../../../stegano/imageDecoder";
import {hasCapacity, isPNG} from "../../../../../stegano/checks";
import {showToast} from "../../../../../utils/toast";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-stegano',
  templateUrl: './stegano.component.html',
  styleUrls: ['./stegano.component.css']
})
export class SteganoComponent implements OnInit {
  form!: FormGroup;
  form2!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: NbToastrService
  ) {
    this.form = fb.group({
      image: null,
      text: '',
      password: ''
    });
    this.form2 = fb.group({
      image: null,
      password: ''
    });
  }

  ngOnInit(): void {
  }

  create() {
    const text = this.form.value.text
    const pass = this.form.value.password
    const reader = new FileReader()
    const toast = (msg: string, title: string) => {
      showToast(this.toastService, msg, title, 'danger')
    }
    // @ts-ignore
    let f = document.getElementById('upload_file').files[0]
    if (f) {
      reader.onloadend = function (e) {
        if (!hasCapacity(<ArrayBuffer>e.target!.result, text))
          toast("This message is too big for this file", "Not enough space!")
        if (!isPNG(f.name))
          toast("The image must be of PNG format and of RGB type", "Bad image!")

        const steganoImage = "data:image/png;base64," + encode(<ArrayBuffer>e.target!.result, text, pass)
        const link = document.createElement("a");
        document.getElementById('encoder-form')!.appendChild(link)
        link.text = 'Download stegano image'
        link.href = steganoImage;
        link.download = 'mercury-download';
      }
      reader.readAsArrayBuffer(f)
    }
  }

  decrypt() {
    const pass = this.form2.value.password
    const reader = new FileReader()
    const toast = (msg: string, title: string) => {
      showToast(this.toastService, msg, title, 'danger')
    }
    // @ts-ignore
    let f = document.getElementById('upload_cover').files[0]
    if (f) {
      reader.onloadend = function (e) {
        // @ts-ignore
        document.getElementById("decoded_message").innerText = decode(<ArrayBuffer>e.target!.result, pass)
      }
      reader.readAsArrayBuffer(f)
    }
  }
}
