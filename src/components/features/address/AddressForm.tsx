import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../../App'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {AddressContext} from '../../../providers/address.provider'
import {color, size} from '../../../tokens'
import {Address, ResponseAddress} from '../../../types/address'
import {Box, Gutter, Link} from '../../ui'
import {NumberInput} from './NumberInput'
import {StreetInput} from './StreetInput'

export type BagResponseContent = {
  _display: string
  uri: string
}[]

export type BagResponse = {
  label: string
  content: BagResponseContent
  total_results: number
}

export const AddressForm = () => {
  const [address, setAddress] = useState<ResponseAddress | null>(null)
  const [bagList, setBagList] = useState<BagResponseContent | null | undefined>(
    null,
  )
  const [isNumberSelected, setIsNumberSelected] = useState(false)
  const [isStreetSelected, setIsStreetSelected] = useState(false)
  const [layoutY, setLayoutY] = useState<number | null>(null)
  const [number, setNumber] = useState<string>('')
  const [street, setStreet] = useState<string>('')

  const moveUpAnim = useRef(new Animated.Value(0)).current

  const inputNumberRef = useRef<any>()
  const inputStreetRef = useRef<any>()

  const y = moveUpAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, layoutY ? -layoutY + size.spacing.lg : 0],
  })

  const addressContext = useContext(AddressContext)

  const moveUp = () => {
    Animated.timing(moveUpAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const moveDown = () => {
    clearStreet()
    inputStreetRef.current.focus()
    Animated.timing(moveUpAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>()

  const apiAddress = useFetch<any>({
    onLoad: false,
    options: {params: {features: 2}}, // features: 2 includes addresses in Weesp.
    url: 'https://api.data.amsterdam.nl/atlas/search/adres/',
  })

  const apiBag = useFetch<BagResponse[]>({
    onLoad: false,
    options: {params: {features: 2}}, // features: 2 includes addresses in Weesp.
    url: 'https://api.data.amsterdam.nl/atlas/typeahead/bag/',
  })

  const changeNumber = (text: string) => {
    setIsNumberSelected(false)
    setNumber(text)
  }

  const changeStreet = (text: string) => {
    setIsStreetSelected(false)
    setStreet(text)
    setNumber('')
  }

  const clearStreet = () => {
    setStreet('')
  }

  const removeWeespSuffix = (streetName: string) => {
    return streetName.replace(/ \(Weesp\)/g, '')
  }

  const selectNumber = (text: string) => {
    setNumber(text)
    setIsNumberSelected(true)
  }

  const selectStreet = (text: string) => {
    setStreet(text)
    setIsStreetSelected(true)
    moveUp()
    inputNumberRef.current.focus()
  }

  const asyncStorage = useAsyncStorage()

  const transformAddress = (responseAddress: Address) => {
    const {
      adres,
      bag_huisletter,
      bag_toevoeging,
      centroid,
      huisnummer,
      postcode,
      straatnaam,
      woonplaats,
    } = responseAddress
    return {
      adres,
      bag_huisletter,
      bag_toevoeging,
      centroid,
      huisnummer,
      postcode,
      straatnaam,
      woonplaats,
    }
  }

  const storeAddress = async (transformedAddress: Address) => {
    await asyncStorage.storeData('address', transformedAddress)
  }

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    apiBag.fetchData({q: street})
  }, [street])

  useEffect(() => {
    const streetWithoutWeespSuffix = removeWeespSuffix(street)
    isStreetSelected && isNumberSelected
      ? apiAddress.fetchData({
          q: `${streetWithoutWeespSuffix} ${number}`,
        })
      : apiBag.fetchData({
          q: `${streetWithoutWeespSuffix} ${number}`,
        })
  }, [number, isNumberSelected, isStreetSelected])

  useEffect(() => {
    const suggestions = apiBag.data?.find(
      item => item.label === 'Straatnamen' || item.label === 'Adressen',
    )
    setBagList(suggestions?.content)
  }, [apiBag.data])

  useEffect(() => {
    setAddress(apiAddress.data)
  }, [apiAddress.data])

  useEffect(() => {
    if (address) {
      const transformedAddress = transformAddress(address?.results[0])
      addressContext.changeAddress(transformedAddress)
      addressContext.saveInStore
        ? storeAddress(transformedAddress).then(() => navigation.goBack())
        : navigation.goBack()
    }
  }, [address])

  return (
    <Animated.View style={[{transform: [{translateY: y}]}]}>
      <Box background="lighter" inset="lg">
        <View style={styles.streetInputWrapper}>
          <StreetInput
            bagList={bagList}
            changeStreet={changeStreet}
            inputStreetRef={inputStreetRef}
            isStreetSelected={isStreetSelected}
            selectStreet={selectStreet}
            street={street}
            styles={styles}
          />
        </View>
        <View onLayout={event => setLayoutY(event.nativeEvent.layout.y)}>
          {street ? (
            <>
              <Link direction="up" emphasis text={street} onPress={moveDown} />
              <Gutter height={size.spacing.sm} />
            </>
          ) : null}
          <NumberInput
            bagList={bagList}
            changeNumber={changeNumber}
            inputNumberRef={inputNumberRef}
            isNumberSelected={isNumberSelected}
            isStreetSelected={isStreetSelected}
            number={number}
            selectNumber={selectNumber}
            styles={styles}
          />
        </View>
      </Box>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  backToStreet: {
    flexDirection: 'row',
  },
  streetInputWrapper: {
    height: '100%',
  },
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: color.border.separator,
    borderStyle: 'solid',
  },
})
