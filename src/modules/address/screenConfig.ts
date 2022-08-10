import {StackNavigationRoutes} from '@/app/navigation'
import {
  AddressStackParams,
  AddressModalParams,
  AddressModalName,
} from '@/modules/address/routes'
import {
  AddressFormScreen,
  AddressPrivacyInfoScreen,
} from '@/modules/address/screens'

export const addressScreenConfig: StackNavigationRoutes<AddressStackParams> = {}

export const addressModals: StackNavigationRoutes<
  AddressModalParams,
  AddressModalName
> = {
  [AddressModalName.addressForm]: {
    component: AddressFormScreen,
    name: AddressModalName.addressForm,
    options: {
      headerTitle: 'Uw adres',
    },
  },
  [AddressModalName.addressInfo]: {
    component: AddressPrivacyInfoScreen,
    name: AddressModalName.addressInfo,
    options: {
      headerShown: false,
    },
  },
}
