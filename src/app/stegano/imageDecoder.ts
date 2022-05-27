import {decrypt, getEOFIndex, getLSBs, recreateCipherText} from "./transformer";
import * as png from "fast-png";

/*
* Returns steganography data from a cover image
* @param image - an Array Buffer extracted from the uploaded cover image
* @param pass - a string to decrypt the hidden message
*
* The image must be of PNG type and RGB (3 channels)
* */
export function decode(image: ArrayBuffer, pass: string) {
  const pngData = png.decode(image)
  const imageData = <Uint8Array>pngData.data
  const returnedIndex = getEOFIndex(imageData)
  const buffer = imageData.slice(0, returnedIndex)
  const LSBs = getLSBs(buffer)
  const encryptedText = recreateCipherText(LSBs)
  return decrypt(encryptedText, pass)
}
