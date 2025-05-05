export interface Country {
  name: {
    common: string
    official: string
    nativeName?: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
  cca2: string
  flags: {
    png: string
    svg: string
    alt?: string
  }
  population: number
  region: string
  subregion?: string
  capital?: string[]
  tld?: string[]
  currencies?: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  languages?: {
    [key: string]: string
  }
  borders?: string[]
}
