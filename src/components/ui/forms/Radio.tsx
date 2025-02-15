import {Pressable, PressableProps} from 'react-native'
import {Circle, Svg} from 'react-native-svg'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {useTheme} from '@/themes/useTheme'

type RadioProps = {
  isSelected: boolean
  label: string
  onPress: () => void
} & PressableProps

type RadioIndicatorProps = {
  checked: boolean
}

const RadioIndicator = ({checked}: RadioIndicatorProps) => {
  const {color} = useTheme()

  return (
    <Svg
      height={24}
      viewBox="0 0 24 24"
      width={24}>
      <Circle
        cx={12}
        cy={12}
        fill={color.control.default.background}
        r={11}
        stroke={color.control.checked.border}
        strokeWidth={2}
      />
      {!!checked && (
        <Circle
          cx={12}
          cy={12}
          fill={color.control.checked.border}
          r={8}
        />
      )}
    </Svg>
  )
}

export const Radio = ({
  label,
  isSelected,
  onPress,
  ...pressableProps
}: RadioProps) => (
  <Pressable
    {...pressableProps}
    accessibilityState={{selected: isSelected}}
    onPress={onPress}>
    <Row
      gutter="sm"
      valign="center">
      <RadioIndicator checked={isSelected} />
      <Phrase>{label}</Phrase>
    </Row>
  </Pressable>
)
