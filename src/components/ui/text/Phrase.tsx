import {ReactNode, useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme} from '@/themes/themes'
import {Emphasis, ParagraphVariants} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

export type PhraseProps = {
  children: ReactNode
  /**
   * Defines the color of the phrase. Maps with the text color tokens.
   */
  color?: 'default' | 'inverse' | 'link' | 'secondary'
  /**
   * Allows the phrase to convey more emphasis.
   */
  emphasis?: keyof typeof Emphasis
  /**
   * Whether the phrase is underlined. Use this for a link only.
   */
  underline?: boolean
  /**
   * Which variation of a phrase to display.
   */
  variant?: ParagraphVariants
} & Omit<TextProps, 'style'>

/**
 * Displays (very) short text phrases.
 * Offers the three sizing variants, and bold text.
 * For sentences, use `Paragraph` instead.
 */
export const Phrase = ({
  children,
  color = 'default',
  emphasis = 'default',
  underline = false,
  variant = 'body',
  ...textProps
}: PhraseProps) => {
  const createdStyles = useMemo(
    () => createStyles({color, emphasis, underline, variant}),
    [color, emphasis, underline, variant],
  )
  const styles = useThemable(createdStyles)

  return (
    <Text
      style={styles.text}
      {...textProps}>
      {children}
    </Text>
  )
}

const createStyles =
  ({
    color: textColor,
    emphasis,
    underline,
    variant,
  }: Required<
    Pick<PhraseProps, 'color' | 'emphasis' | 'underline' | 'variant'>
  >) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily:
          text.fontFamily[emphasis === Emphasis.strong ? 'bold' : 'regular'],
        fontSize: text.fontSize[variant],
        lineHeight: text.lineHeight[variant],
        textDecorationLine: underline ? 'underline' : 'none',
      },
    })
