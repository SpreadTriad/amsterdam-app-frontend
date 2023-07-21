import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {AddressModalName} from '@/modules/address/routes'
import {removeAddress, selectAddress} from '@/modules/address/slice'
import {userModule} from '@/modules/user'
import {setAlert} from '@/store/slices/alert'

export const DisplayAddress = () => {
  const address = useSelector(selectAddress)
  const dispatch = useDispatch()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  const removeAddressAndShowAlert = () => {
    dispatch(removeAddress())
    dispatch(
      setAlert({
        closeType: AlertCloseType.withoutButton,
        content: {
          title: 'Gelukt',
          text: 'Het adres is verwijderd uit uw profiel.',
        },
        testID: 'AddressDeletedAlert',
        variant: AlertVariant.positive,
        withIcon: false,
      }),
    )
  }

  return (
    <Row>
      <Column flex={1}>
        <TopTaskButton
          iconName="location"
          onPress={() => navigation.navigate(AddressModalName.addressForm)}
          testID="AddressAddButton"
          text={address?.addressLine1 ?? 'Vul een adres in'}
          title="Mijn adres"
        />
      </Column>
      {!!address && (
        <Row>
          <Button
            iconName="trash-bin"
            onPress={removeAddressAndShowAlert}
            testID="AddressDeleteButton"
            variant="tertiary"
          />
        </Row>
      )}
    </Row>
  )
}
