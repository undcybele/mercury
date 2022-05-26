import {encrypt, toBitArray, toNormalizedArray, toSteganoArray} from "./transformer";
import * as png from "fast-png";
import {ImageData} from "fast-png";
import * as base64 from "base64-js";
import {environment} from "../../../environments/environment"

/*
* Returns encoded image data with a hidden text
* @param image - an Array Buffer extracted from the uploaded image
* @param text - simple string containing the soon-to-be hidden message
* @param pass - the password used to encrypt the secret text
*
* The image must be of PNG type and RGB (3 channels)
* */
export function encode(image: ArrayBuffer, text: string, pass: string) {
  const encodedText = encrypt(text, pass)
  const byteText = toBitArray(encodedText)
  const pngData = png.decode(image)
  const imageData = <Uint8Array>pngData.data
  console.log(base64.toByteArray(environment.eofCode))
  const normalizedImage = toNormalizedArray(imageData, byteText.length)
  const steganoImage = toSteganoArray(normalizedImage, byteText)
  const imageObject: ImageData = {width: pngData.width, height: pngData.height, data: steganoImage}
  const createdImage = png.encode(imageObject)
  return base64.fromByteArray(createdImage)
}
