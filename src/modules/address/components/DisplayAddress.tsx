import Remove from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {AlertVariant} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {Address} from '@/modules/address'
import {AddressModalName} from '@/modules/address/routes'
import {removePrimaryAddress} from '@/modules/address/slice'
import {module as userModule} from '@/modules/user'
import {setAlert} from '@/store'

type Props = {
  address: Address
}

export const DisplayAddress = ({address}: Props) => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  const removeAddressAndShowAlert = () => {
    dispatch(removePrimaryAddress())
    dispatch(
      setAlert({
        content: {
          title: 'Gelukt',
          text: 'Het adres is verwijderd uit uw profiel.',
        },
        variant: AlertVariant.success,
        isVisible: true,
      }),
    )
  }

  return (
    <Column gutter="md">
      <Column>
        <Paragraph>{address.adres}</Paragraph>
        <Paragraph>
          {[
            address.postcode.substring(0, 4),
            address.postcode.substring(4, 6),
            address.woonplaats.toUpperCase(),
          ].join(' ')}
        </Paragraph>
      </Column>
      <Row gutter="md">
        <Button
          label="Wijzig adres"
          onPress={() => navigation.navigate(AddressModalName.addressForm)}
          variant="primary"
        />
        <Button
          icon={Remove}
          label="Verwijder"
          onPress={removeAddressAndShowAlert}
          variant="tertiary"
        />
      </Row>
    </Column>
  )
}
