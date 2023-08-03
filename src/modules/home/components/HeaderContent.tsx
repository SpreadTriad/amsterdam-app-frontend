import {getHeaderTitle} from '@react-navigation/elements'
import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import {StyleSheet, View} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {IconSize} from '@/components/ui/types'

type Props = Pick<
  StackHeaderProps & {options: {accessibilityLanguage?: string}},
  'back' | 'navigation' | 'options' | 'route'
>

const chevronSize = 'ml'

export const HeaderContent = ({back, navigation, options}: Props) => {
  const title = getHeaderTitle(options, '')
  const {accessibilityLanguage} = options

  return (
    <Row
      gutter="lg"
      valign="center">
      <View style={styles.sideColumn}>
        {!!back && (
          <IconButton
            accessibilityLabel="Terug"
            hitSlop={16}
            icon={
              <Icon
                color="link"
                name="chevron-left"
                scalesWithFont={false}
                size={chevronSize}
              />
            }
            onPress={navigation.goBack}
            testID="HeaderBackButton"
          />
        )}
      </View>
      <View style={styles.middleColumn}>
        <ScreenTitle
          accessibilityLanguage={accessibilityLanguage}
          text={title}
        />
      </View>
      <View style={styles.sideColumn} />
    </Row>
  )
}

const styles = StyleSheet.create({
  middleColumn: {
    flex: 1,
    alignItems: 'center',
  },
  sideColumn: {
    minWidth: IconSize[chevronSize],
  },
})
