interface InstaImage {
  url: string,
  height: number,
  width: number
}

export interface InstaMedia {
  images: {
    low_resolution: InstaImage,
    thumbnail: InstaImage,
    standard_resolution: InstaImage
  },
  link: string
  caption: {
    text: string
  }
}
