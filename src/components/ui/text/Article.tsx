import React from 'react'
import {useWindowDimensions} from 'react-native'
import RenderHTML, {
  MixedStyleDeclaration,
  RenderersProps,
} from 'react-native-render-html'
import {Theme, useThemable, useTheme} from '@/themes'
import {SizeTokens} from '@/themes/tokens'

type Props = {
  content: string | undefined
  isIntro?: boolean
}

const transformRules = [
  {
    find: /"\/publish/g,
    replace: '"https://www.amsterdam.nl/publish',
  },
  {
    find: /&quot;\/publish/g,
    replace: '&quot;https://www.amsterdam.nl/publish',
  },
]

const transformContent = (content: string) => {
  // Applies all transform rules to the content.
  return transformRules.reduce(
    (result, {find, replace}) => result.replace(find, replace),
    content,
  )
}

const computeEmbeddedMaxWidth =
  (size: SizeTokens) => (contentWidth: number, tagName: string) => {
    if (tagName === 'img') {
      return contentWidth - 2 * size.spacing.md
    }

    return contentWidth
  }

/**
 * Renders HTML content, applying the typographic design.
 */
export const Article = ({content, isIntro}: Props) => {
  const {width} = useWindowDimensions()
  const {size} = useTheme()
  const fonts = useThemable(createFontList)
  const baseStyles = useThemable(createBaseStyles(isIntro))
  const renderersProps = useThemable(createRenderersProps)

  if (!content) {
    return null
  }

  const html = transformContent(content)

  const styles: Record<string, MixedStyleDeclaration> = {
    h3: baseStyles.titleLevel3,
    img: baseStyles.figure,
    li: baseStyles.paragraph,
    p: baseStyles.paragraph,
  }

  return (
    <RenderHTML
      computeEmbeddedMaxWidth={computeEmbeddedMaxWidth(size)}
      contentWidth={width}
      renderersProps={renderersProps}
      source={{html}}
      systemFonts={fonts}
      tagsStyles={styles}
    />
  )
}

const createBaseStyles: (
  isIntro: Props['isIntro'],
) => (theme: Theme) => Record<string, MixedStyleDeclaration> =
  isIntro =>
  ({color, text}: Theme) => {
    const lineHeight = isIntro
      ? text.lineHeight.intro * text.fontSize.intro
      : text.lineHeight.body * text.fontSize.body

    return {
      figure: {
        marginBottom: lineHeight,
      },
      paragraph: {
        color: color.text.default,
        fontFamily: text.fontWeight.regular,
        fontSize: isIntro ? text.fontSize.intro : text.fontSize.body,
        lineHeight,
        marginTop: 0,
        marginBottom: lineHeight,
      },
      titleLevel3: {
        color: color.text.default,
        fontFamily: text.fontWeight.bold,
        fontSize: text.fontSize.h3,
        lineHeight: text.lineHeight.h3 * text.fontSize.h3,
        marginTop: 0,
        marginBottom: lineHeight,
      },
    }
  }

const createFontList = ({text}: Theme): string[] => [
  text.fontWeight.bold,
  text.fontWeight.extraBold,
  text.fontWeight.light,
  text.fontWeight.regular,
]

const createRenderersProps = ({text}: Theme): Partial<RenderersProps> => ({
  ul: {
    markerBoxStyle: {
      paddingRight: text.fontSize.body / 3,
      paddingTop: (text.lineHeight.body * text.fontSize.body) / 5,
    },
  },
})
