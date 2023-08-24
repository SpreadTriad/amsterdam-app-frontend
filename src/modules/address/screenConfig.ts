import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  AddressModalName,
  AddressModalParams,
  AddressStackParams,
} from '@/modules/address/routes'
import {AddressFormScreen} from '@/modules/address/screens/AddressForm.screen'
import {LocationPermissionInstructionsScreen} from '@/modules/address/screens/LocationPermissionInstructions.screen'
import {PrivacyInfoScreen} from '@/modules/address/screens/PrivacyInfo.screen'

export const screenConfig: StackNavigationRoutes<AddressStackParams> = {}

export const addressModals: StackNavigationRoutes<
  AddressModalParams,
  AddressModalName
> = {
  [AddressModalName.addressForm]: {
    component: AddressFormScreen,
    name: AddressModalName.addressForm,
  },
  [AddressModalName.locationPermissionInstructions]: {
    component: LocationPermissionInstructionsScreen,
    name: AddressModalName.locationPermissionInstructions,
  },
  [AddressModalName.privacyInfo]: {
    component: PrivacyInfoScreen,
    name: AddressModalName.privacyInfo,
  },
}
