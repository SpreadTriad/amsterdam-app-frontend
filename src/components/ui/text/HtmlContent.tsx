import {useCallback, useMemo, useState} from 'react'
import {LayoutChangeEvent, Platform, TextStyle, View} from 'react-native'
import RenderHTML, {
  MixedStyleDeclaration,
  RenderersProps,
} from 'react-native-render-html'
import {TestProps} from '@/components/ui/types'
import {promoteInlineLinks} from '@/components/ui/utils/promoteInlineLinks'
import {OpenUrl, useOpenUrl} from '@/hooks'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {Theme, useThemable} from '@/themes'
import {TextTokens} from '@/themes/tokens'

type Props = {
  content: string | undefined
  isIntro?: boolean
  transformRules?: HtmlTransformRule[]
} & TestProps

export type HtmlTransformRule = {
  find: RegExp
  replace: string
}

const defaultTransformRules: HtmlTransformRule[] = [
  {
    find: /"\/publish/g,
    replace: '"https://www.amsterdam.nl/publish',
  },
  {
    find: /&quot;\/publish/g,
    replace: '&quot;https://www.amsterdam.nl/publish',
  },
]

/**
 * Applies all transform rules to the content.
 */
const transformContent = (
  content: string,
  additionalTransformRules: HtmlTransformRule[] = [],
) =>
  [...defaultTransformRules, ...additionalTransformRules].reduce(
    (result, {find, replace}) => result.replace(find, replace),
    content,
  )

/**
 * Renders HTML content, applying the typographic design.
 */
export const HtmlContent = ({content, isIntro, transformRules}: Props) => {
  const openUrl = useOpenUrl()
  const [contentWidth, setContentWidth] = useState<number>(0)
  const baseStyle = useThemable(createBaseStyle)
  const styles = useThemable(createStyles(isIntro))
  const renderersProps = useThemable(createRenderersProps(openUrl))
  const systemFonts = useThemable(createFontList)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()

  const onLayoutChange = useCallback((event: LayoutChangeEvent) => {
    setContentWidth(event.nativeEvent.layout.width)
  }, [])

  const html = useMemo(() => {
    if (!content) {
      return
    }

    const transformedContent = transformContent(content, transformRules)

    return isScreenReaderEnabled
      ? promoteInlineLinks(transformedContent)
      : transformedContent
  }, [content, isScreenReaderEnabled, transformRules])

  if (!html) {
    return null
  }

  const tagsStyles: Record<string, MixedStyleDeclaration> = {
    a: {...styles.boldText, ...styles.link},
    b: styles.boldText,
    h1: {...styles.boldText, ...styles.titleLevel1, ...styles.titleMargins},
    h2: {...styles.boldText, ...styles.titleLevel2, ...styles.titleMargins},
    h3: {...styles.boldText, ...styles.titleLevel3, ...styles.titleMargins},
    h4: {...styles.boldText, ...styles.titleLevel4, ...styles.titleMargins},
    h5: {...styles.boldText, ...styles.titleLevel5, ...styles.titleMargins},
    h6: {...styles.boldText, ...styles.titleLevel6, ...styles.titleMargins},
    img: styles.margins,
    li: {...styles.paragraph},
    ol: {...styles.paragraph, ...styles.margins},
    p: {...styles.paragraph, ...styles.margins},
    strong: styles.boldText,
    ul: styles.margins,
  }

  return (
    <View onLayout={onLayoutChange}>
      <RenderHTML
        source={{html}}
        {...{baseStyle, contentWidth, renderersProps, systemFonts, tagsStyles}}
      />
    </View>
  )
}

const getFontSize = (text: TextTokens, isIntro = false) =>
  isIntro ? text.fontSize.intro : text.fontSize.body

const getLineHeight = (text: TextTokens, isIntro = false) =>
  isIntro
    ? text.lineHeight.intro * text.fontSize.intro
    : text.lineHeight.body * text.fontSize.body

const createBaseStyle = ({color, text}: Theme) => ({
  color: color.text.default,
  fontFamily: text.fontFamily.regular,
  fontSize: getFontSize(text),
  lineHeight: getLineHeight(text),
})

const createStyles: (
  isIntro: Props['isIntro'],
) => (theme: Theme) => Record<string, MixedStyleDeclaration> =
  isIntro =>
  ({color, text}: Theme) => {
    const lineHeight = getLineHeight(text, isIntro)

    // By default, Android sets this to `bold` – which breaks the font family.
    const platformDependentFontWeight: TextStyle['fontWeight'] =
      Platform.OS === 'android' ? 'normal' : undefined

    return {
      margins: {
        marginTop: 0,
        marginBottom: lineHeight,
      },
      paragraph: {
        fontSize: getFontSize(text, isIntro),
        lineHeight,
      },
      link: {
        color: color.pressable.primary.default,
        textDecorationLine: 'none',
      },
      boldText: {
        fontFamily: text.fontFamily.bold,
        fontWeight: platformDependentFontWeight,
      },
      titleLevel1: {
        fontSize: text.fontSize.h1,
        lineHeight: text.lineHeight.h1 * text.fontSize.h1,
      },
      titleLevel2: {
        fontSize: text.fontSize.h2,
        lineHeight: text.lineHeight.h2 * text.fontSize.h2,
      },
      titleLevel3: {
        fontSize: text.fontSize.h3,
        lineHeight: text.lineHeight.h3 * text.fontSize.h3,
      },
      titleLevel4: {
        fontSize: text.fontSize.h4,
        lineHeight: text.lineHeight.h4 * text.fontSize.h4,
      },
      titleLevel5: {
        fontSize: text.fontSize.h5,
        lineHeight: text.lineHeight.h5 * text.fontSize.h5,
      },
      titleLevel6: {
        fontSize: text.fontSize.h6,
        lineHeight: text.lineHeight.h6 * text.fontSize.h6,
      },
      titleMargins: {
        marginTop: 0,
        marginBottom: lineHeight / 2,
      },
    }
  }

const createFontList = ({text}: Theme): string[] => [
  text.fontFamily.bold,
  text.fontFamily.regular,
]

const createRenderersProps =
  (openUrl: OpenUrl) =>
  ({text}: Theme): Partial<RenderersProps> => ({
    a: {
      onPress: (_event, href) => openUrl(href),
    },
    ul: {
      markerBoxStyle: {
        paddingLeft: text.fontSize.body,
        paddingRight: text.fontSize.body - 6,
        paddingTop: (text.lineHeight.body * text.fontSize.body) / 5,
      },
    },
  })
