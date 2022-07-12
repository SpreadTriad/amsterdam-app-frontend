import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Card, CardBody, SingleSelectable, Text, Title} from '@/components/ui'
import {Button, TextButton} from '@/components/ui/buttons'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {module as addressModule} from '@/modules/address'
import {
  removePrimaryAddress,
  selectAddress,
} from '@/modules/address/addressSlice'
import {AddressRouteName} from '@/modules/address/routes'
import {module as userModule} from '@/modules/user'
import {setAlert} from '@/store/alertSlice'
import {isEmptyObject} from '@/utils'

export const Address = () => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()
  const {primary: primaryAddress} = useSelector(selectAddress)

  const removeAddressAndShowAlert = async () => {
    dispatch(removePrimaryAddress())
    dispatch(
      setAlert({
        content: {
          title: 'Gelukt',
          text: 'Het adres is verwijderd uit uw profiel.',
        },
        variant: 'success',
        isVisible: true,
      }),
    )
  }

  return (
    <>
      {primaryAddress && !isEmptyObject(primaryAddress) ? (
        <Card>
          <CardBody>
            <SingleSelectable>
              <Title level={4} text="Uw adres" />
              <Text large>{primaryAddress.adres}</Text>
              <Text large>
                {[primaryAddress.postcode, primaryAddress.woonplaats].join(' ')}
              </Text>
            </SingleSelectable>
            <Row align="between" valign="center" gutter="md" wrap>
              <View>
                <Gutter height="md" />
                <Button
                  label="Wijzig adres"
                  onPress={() =>
                    navigation.navigate(addressModule.slug, {
                      screen: AddressRouteName.addressForm,
                    })
                  }
                  variant="secondary"
                />
              </View>
              <View>
                <Gutter height="md" />
                <TextButton
                  emphasis
                  icon="remove"
                  label="Verwijder adres"
                  onPress={removeAddressAndShowAlert}
                />
              </View>
            </Row>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <Column gutter="md">
              <>
                <Title level={4} text="Adres" />
                <Text>
                  Vul een straatnaam en huisnummer in zodat u informatie krijgt
                  uit die buurt.
                </Text>
              </>
              <Row align="between">
                <Button
                  label="Vul adres in"
                  onPress={() =>
                    navigation.navigate(addressModule.slug, {
                      screen: AddressRouteName.addressForm,
                    })
                  }
                  variant="secondary"
                />
                <Button
                  label="Meer informatie"
                  onPress={() =>
                    navigation.navigate(addressModule.slug, {
                      screen: AddressRouteName.addressInfo,
                    })
                  }
                  variant="tertiary"
                />
              </Row>
            </Column>
          </CardBody>
        </Card>
      )}
    </>
  )
}
