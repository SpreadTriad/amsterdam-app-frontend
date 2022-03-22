import {Image} from './image'
import {RichText, Section} from './section'

export type CityContactInfo = {
  sections: Section[]
}

export type CityOffices = {
  offices: CityOfficeOverviewItem[]
}

export type CityOfficeOverviewItem = {
  identifier: string
  title: string
  url: string
}

export type CityOffice = {
  active: boolean
  address: RichText
  identifier: string
  contact: {
    Bellen: RichText
    Mailen: RichText
    Openingstijden: RichText
  }
  images: Image
  info: RichText
  last_seen: string // date
  title: string
}
