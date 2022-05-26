export const hasCapacity = (image: ArrayBuffer, text: string): Boolean => image.byteLength >= text.length

export const isPNG = (imageName: string): Boolean => imageName.split('.').pop()!.toLowerCase() === 'png'

export const isEven = (n: number) => !(n % 2)


