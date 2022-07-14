import {StackNavigationRoutes} from '@/app/navigation'
import {ContactRouteName, ContactStackParams} from '@/modules/contact/routes'
import {
  CityOfficesScreen,
  ContactFormScreen,
  MakeAppointmentScreen,
} from '@/modules/contact/screens'

export const contactScreenConfig: StackNavigationRoutes<
  ContactStackParams,
  ContactRouteName
> = {
  [ContactRouteName.cityOffices]: {
    component: CityOfficesScreen,
    name: ContactRouteName.cityOffices,
    options: {
      headerTitle: 'Contact',
    },
  },
  [ContactRouteName.contactForm]: {
    component: ContactFormScreen,
    name: ContactRouteName.contactForm,
    options: {
      headerTitle: 'Neem contact op',
    },
  },
  [ContactRouteName.makeAppointment]: {
    component: MakeAppointmentScreen,
    name: ContactRouteName.makeAppointment,
    options: {
      headerTitle: 'Maak een afspraak',
    },
  },
}
