import {FC, memo, useMemo} from 'react'
import {ImageSourcePropType, Pressable, StyleSheet} from 'react-native'
import {AspectRatio, Gutter} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {TestID} from '@/components/ui/types'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

type Props = {
  Kicker?: FC
  additionalAccessibilityLabel?: string
  imageSource?: ImageSourcePropType
  onPress: () => void
  subtitle?: string
  testID?: TestID
  title: string
  width?: number
}

export const ProjectCard = memo(
  ({
    additionalAccessibilityLabel,
    imageSource,
    Kicker,
    onPress,
    subtitle,
    testID,
    title,
    width,
  }: Props) => {
    const createdStyles = useMemo(() => createStyles({width: width}), [width])
    const styles = useThemable(createdStyles)

    return (
      <>
        <Pressable
          accessibilityLabel={accessibleText(
            title,
            subtitle,
            additionalAccessibilityLabel,
          )}
          accessibilityRole="button"
          style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
          {...{onPress, testID}}>
          {!!imageSource && (
            <>
              <AspectRatio aspectRatio="wide">
                <Image
                  source={imageSource}
                  testID="ConstructionWorkCardProjectImageMain"
                />
              </AspectRatio>
              <Gutter height="sm" />
            </>
          )}
          {!!Kicker && (
            <>
              <Kicker />
              <Gutter height="xs" />
            </>
          )}
          <Title
            color="link"
            level="h4"
            testID="ConstructionWorkCardProjectTextTitle"
            text={title}
          />
          {!!subtitle && (
            <Paragraph testID="ConstructionWorkCardProjectTextSubtitle">
              {subtitle}
            </Paragraph>
          )}
          {/*TODO Replace with better `Grid` gutters */}
          <Gutter height="sm" />
        </Pressable>
        <Gutter height="sm" />
      </>
    )
  },
)

const createStyles =
  ({width}: Partial<Props>) =>
  ({color}: Theme) =>
    StyleSheet.create({
      pressable: {
        width,
        flexGrow: 1,
      },
      pressed: {
        backgroundColor: color.pressable.pressed.background,
      },
    })
