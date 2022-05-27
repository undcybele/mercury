import * as crypto from 'crypto-js'
import {isEven} from "./checks"

export const encrypt = (text: string, pass: string) => crypto.AES.encrypt(text, pass).toString()

export const decrypt = (cipherText: string, pass: string) => crypto.AES.decrypt(cipherText, pass).toString(crypto.enc.Utf8)

export const toByteArray = (input: string): string[] => [...input].map(char => {
  const char2 = char.charCodeAt(0).toString(2)
  if (char2.length === 8) {
    return char2
  } else {
    return '0'.repeat(8 - char2.length) + char2
  }
})

export const toBitArray = (input: string): string[] => toByteArray(input).join('').split('')

export const toNormalizedArray = (input: Uint8Array, textSize: number): Uint8Array => {
  return input.map((val, index) => {
    if (index < textSize) {
      if (val % 2 == 0) return val
      else return val - 1
    }
    return val
  })
}

export const toSteganoArray = (image: Uint8Array, text: string[]): Uint8Array => {
  let i = 0
  for (; i < text.length; i++) {
    if (text[i] == '1') image[i] += 1
  }
  image[i++] = 109
  image[i++] = 101
  image[i++] = 114
  image[i++] = 99
  image[i++] = 117
  image[i++] = 114
  image[i++] = 121
  return image
}

export const getEOFIndex = (input: Uint8Array) => {
  let returnedIndex = 0
  input.every((byte, index) => {
    if (byte == 109 && input[index + 1] == 101 && input[index + 2] == 114) {
      returnedIndex = index
      return false
    }
    return true
  })
  return returnedIndex
}

export const getLSBs = (buffer: Uint8Array) => {
  let lsbArray: string[] = []
  buffer.forEach((byte) => {
    if (isEven(byte)) {
      lsbArray.push('0')
    } else lsbArray.push('1')
  })
  return lsbArray.join('').split(/(.{8})/).filter(x => x.length == 8)
}

export const recreateCipherText = (lsbArray: string[]) => lsbArray.map(val => String.fromCharCode(parseInt(val, 2))).join('')


