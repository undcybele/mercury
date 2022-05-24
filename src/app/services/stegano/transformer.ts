import * as crypto from 'crypto-js'

export const encrypt = (text: string, pass: string) => {
  console.log(`Text: ${text}`)
  console.log(`Password: ${pass}`)
  const cipher = crypto.AES.encrypt(text, pass).toString()
  console.log(`Ciphered text: ${cipher}`)
}

export const decrypt = (cipherText: string, pass: string) => {
  console.log(`CipherText: ${cipherText}`)
  console.log(`Password: ${pass}`)
  const decipher = crypto.AES.decrypt(cipherText, pass).toString(crypto.enc.Utf8)
  console.log(`Deciphered text: ${decipher}`)
}

export const toByteArray = (input: string): string[] => [...input].map(char => {
  const char2 = char.charCodeAt(0).toString(2)
  if (char2.length === 8) {
    return char2
  } else {
    return '0'.repeat(8 - char2.length) + char2
  }
})

export const toBitArray = (input: string): string[] => toByteArray(input).join('').split('')

export const toNormalizedArray = (input: string[]): string[] => {
  return input.map((byte) => {
    let arr = byte.split('')
    arr[byte.length - 1] = '0';
    return arr.join('')
  })
}

export const toSteganoArray = (textArray: string[], imageArray: string[]): string[] => {
  return imageArray.map((byte, index) => {
    let arr = byte.split('')
    arr[byte.length - 1] = textArray[index]
    return arr.join('')
  })
}
