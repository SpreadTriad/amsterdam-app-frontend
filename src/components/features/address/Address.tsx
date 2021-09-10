import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../../App'
import {useAsyncStorage} from '../../../hooks'
import {size} from '../../../tokens'
import {Address as AddressType} from '../../../types/address'
import {Box, Card, CardBody, Gutter, Link, Text, Title} from '../../ui'
import {OnboardingAddress} from '../OnboardingAddress'

export const Address = () => {
  const [address, setAddress] = useState<AddressType | undefined>(undefined)
  const [isLoading, setLoading] = useState(true)

  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>()

  const retrieveAddress = useCallback(async () => {
    const addressFromStore = await asyncStorage.getData('address')
    setAddress(addressFromStore)
    setLoading(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveAddress()
    const willFocusSubscription = navigation.addListener('focus', () => {
      retrieveAddress()
    })

    return willFocusSubscription
  }, [navigation, retrieveAddress])

  return (
    <>
      {isLoading ? (
        <Box>
          <ActivityIndicator />
        </Box>
      ) : address ? (
        <Card>
          <CardBody centerContent>
            <View accessible={true} style={styles.addressWrapper}>
              <Text secondary>Uw adres is:</Text>
              <Gutter height={size.spacing.md} />
              <Title level={4} margin text={address.adres} />
              <Text>{[address.postcode, address.woonplaats].join(' ')}</Text>
            </View>
            <Gutter height={size.spacing.sm} />
            <Link
              onPress={() => navigation.navigate('AddressForm')}
              text="Verander adres"
            />
          </CardBody>
        </Card>
      ) : (
        <Box>
          <OnboardingAddress
            text="Vul uw adres en huisnummer in zodat we informatie uit uw buurt
          kunnen tonen."
            title="Uw buurt"
          />
        </Box>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  addressWrapper: {alignItems: 'center'},
})
