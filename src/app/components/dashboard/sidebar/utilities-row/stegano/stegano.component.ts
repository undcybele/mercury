import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {encode} from "../../../../../services/stegano/imageEncoder";
import {decode} from "../../../../../services/stegano/imageDecoder";
import {hasCapacity, isPNG} from "../../../../../services/stegano/checks";
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
    const toast = (msg: string, title: string) => {showToast(this.toastService, msg, title, 'danger')}
    // @ts-ignore
    let f = document.getElementById('upload_file').files[0]
    if (f) {
      reader.onloadend = function (e) {
        try {
          hasCapacity(<ArrayBuffer>e.target!.result, text)
        }
        catch {
          toast("This message is too big for this file", "Not enough space!")
        }
        try {
          isPNG(f.name)
        } catch {
          toast("The image must be of PNG format and of RGB type", "Bad image!")
        }
        // @ts-ignore
        document.getElementById("img").src = "data:image/png;base64," + encode(<ArrayBuffer>e.target!.result, text, pass)
      }
      reader.readAsArrayBuffer(f)
    }
  }

  decrypt(){
    const pass = this.form2.value.password
    const reader = new FileReader()
    const toast = (msg: string, title: string) => {showToast(this.toastService, msg, title, 'danger')}
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
