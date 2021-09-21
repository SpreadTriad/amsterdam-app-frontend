import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import React, {useState} from 'react'
import {
  StyleSheet,
  TextInput as TextInputRN,
  TextInputProps as TextInputRNProps,
  TouchableOpacity,
  View,
} from 'react-native'
import {color, font, size} from '../../tokens'
import {Gutter, Text} from '.'

type Props = {
  label?: string
  minHeight?: number | undefined
  onChangeText?: (event: string) => void
  onFocus?: () => void
  warning?: boolean
} & TextInputRNProps

export const TextInput = React.forwardRef((props: Props, ref: any) => {
  const [hasFocus, setFocus] = useState(false)
  const [value, setValue] = useState('')

  const {onChangeText} = props

  const handleChangeText = (text: string) => {
    setValue(text)
    onChangeText && onChangeText(text)
  }

  const handleClearText = () => {
    setValue('')
    onChangeText && onChangeText('')
  }

  const styles = StyleSheet.create({
    clearButton: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      paddingHorizontal: size.spacing.sm,
    },
    searchSection: {
      flexDirection: 'row',
      backgroundColor: color.background.lighter,
      borderColor: hasFocus ? color.border.inputFocus : color.border.input,
      borderStyle: 'solid',
      borderWidth: hasFocus ? 2 : 1,
    },
    textInput: {
      flex: 1,
      minHeight: props.minHeight ? props.minHeight : 'auto',
      padding: size.spacing.sm,
      color: color.font.regular,
      fontFamily: font.weight.regular,
      fontSize: font.size.p1,
      lineHeight: font.height.p1,
    },
    warning: {
      borderColor: color.border.warning,
      borderWidth: 2,
    },
  })

  return (
    <View>
      <Text
        importantForAccessibility={props.accessibilityLabel ? 'no' : 'yes'}
        secondary>
        {props.label}
      </Text>
      <Gutter height={size.spacing.sm} />
      <View style={[styles.searchSection, props.warning && styles.warning]}>
        <TextInputRN
          {...props}
          onChangeText={text => handleChangeText(text)}
          onFocus={props.onFocus ? props.onFocus : () => setFocus(true)}
          ref={ref}
          style={styles.textInput}
          value={props.value ?? value}
        />
        {value ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityHint="Verwijder uw invoertekst"
            onPress={handleClearText}
            style={styles.clearButton}>
            <Close fill={color.font.regular} height={20} width={20} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
})
