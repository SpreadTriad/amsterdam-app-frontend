import {Ref} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {SearchField} from '@/components/ui/forms/SearchField'
import {StreetSearchResult} from '@/modules/address/components/StreetSearchResult'
import {PdokAddress} from '@/modules/address/types'

type Props = {
  bagList: PdokAddress[]
  changeStreet: (text: string) => void
  inputStreetRef: Ref<TextInput>
  isLoading: boolean
  isStreetSelected: boolean
  selectResult: (item: PdokAddress) => void
  street: string
}

export const StreetInput = ({
  bagList,
  changeStreet,
  inputStreetRef,
  isLoading,
  isStreetSelected,
  selectResult,
  street,
}: Props) => (
  <>
    <SearchField
      autoFocus={!isStreetSelected}
      onChangeText={text => {
        changeStreet(text)
      }}
      placeholder="Vul uw straatnaam of postcode in"
      ref={inputStreetRef}
      testID="AddressStreetInputSearchField"
      value={street}
    />
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.flex}>
      <StreetSearchResult
        bagList={bagList}
        isLoading={isLoading}
        isStreetSelected={isStreetSelected}
        selectResult={selectResult}
        street={street}
      />
    </KeyboardAwareScrollView>
  </>
)

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
