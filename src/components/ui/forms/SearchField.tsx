import {forwardRef, useState} from 'react'
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native'
import {IconButton} from '@/components/ui/buttons'
import {Icon} from '@/components/ui/media'
import {TestID} from '@/components/ui/types'
import {Theme, useThemable} from '@/themes'

type Props = {
  onChangeText?: (event: string) => void
  onFocus?: () => void
  testID: TestID
} & TextInputProps

export const SearchField = forwardRef<TextInput, Props>(
  (
    {onChangeText, onFocus, testID, value = '', ...textInputProps}: Props,
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false)

    const styles = useThemable(createStyles({hasFocus}))
    const themedTextInputProps = useThemable(createTextInputProps)

    const handleBlur = () => setHasFocus(false)

    const handleChangeText = (text: string) => {
      onChangeText?.(text)
    }

    const handleClearText = () => {
      onChangeText?.('')
    }

    const handleFocus = () => {
      setHasFocus(true)
      onFocus?.()
    }

    return (
      <View style={styles.frame}>
        <TextInput
          {...textInputProps}
          {...themedTextInputProps}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          ref={ref}
          style={styles.textInput}
          testID={testID}
          textAlignVertical="top"
          value={value}
        />
        {value ? (
          <IconButton
            accessibilityHint="Maak dit zoekveld leeg"
            icon={<Icon name="close" />}
            onPress={handleClearText}
            testID={testID ? [testID, 'ClearButton'].join('') : undefined}
          />
        ) : (
          <IconButton
            accessibilityHint="Activeer dit zoekveld"
            icon={<Icon name="search" size="lg" />}
            onPress={handleFocus}
            testID={testID ? [testID, 'SubmitButton'].join('') : undefined}
          />
        )}
      </View>
    )
  },
)

const borderWidth = (focus: boolean) => (focus ? 2 : 1)

const createStyles =
  ({hasFocus: hasFocus}: {hasFocus: boolean} & Partial<Props>) =>
  ({color, size, text}: Theme) =>
    StyleSheet.create({
      frame: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: size.spacing.sm,
        paddingBottom:
          size.spacing.sm +
          (hasFocus ? borderWidth(false) - borderWidth(true) : 0),
        paddingHorizontal: size.spacing.md,
        backgroundColor: color.box.background.white,
        borderBottomStyle: 'solid',
        borderBottomColor: hasFocus
          ? color.control.focus.border
          : color.control.default.border,
        borderBottomWidth: borderWidth(hasFocus),
      },
      textInput: {
        flex: 1,
        padding: 0, // Override an Android default
        color: color.text.default,
        fontFamily: text.fontFamily.regular,
        fontSize: text.fontSize.body,
        lineHeight: text.fontSize.body * text.lineHeight.input,
      },
    })

const createTextInputProps = ({color}: Theme): TextInputProps => ({
  placeholderTextColor: color.text.secondary,
})
