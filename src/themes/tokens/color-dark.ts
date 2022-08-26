import {ColorTokens} from '@/themes/tokens/color-light'
import {baseColor} from '@/tokens'

// TODO Implement dark mode properly
export const darkColorTokens: ColorTokens = {
  background: {
    cutout: baseColor.primary.black,
    emphasis: baseColor.primary.blue,
    inactive: baseColor.neutral.grey4,
    inverse: baseColor.neutral.grey1,
  },
  border: {
    default: baseColor.neutral.grey2,
    onGrey: baseColor.neutral.grey3,
    invalid: baseColor.support.invalid,
    primary: baseColor.primary.blue,
  },
  box: {
    background: {
      alert: baseColor.secondary.yellow,
      black: baseColor.primary.black,
      emphasis: baseColor.primary.blue,
      grey: baseColor.neutral.grey1,
      invalid: baseColor.support.invalid,
      white: baseColor.primary.white,
    },
  },
  control: {
    default: {
      background: baseColor.primary.white,
      border: baseColor.neutral.grey4,
    },
    checked: {
      background: baseColor.primary.blue,
      border: baseColor.primary.blue,
    },
    focus: {
      border: baseColor.primary.black,
    },
    switch: {
      background: baseColor.neutral.grey4,
      off: baseColor.neutral.grey4,
      on: baseColor.support.valid,
    },
    warning: {
      border: baseColor.support.invalid,
    },
  },
  pressable: {
    default: {
      background: baseColor.primary.blue,
    },
    primary: {
      default: baseColor.primary.blue,
      highlight: '#00387a',
    },
    secondary: {
      background: baseColor.primary.red,
    },
    tertiary: {
      default: baseColor.primary.white,
      highlight: baseColor.custom.grey1,
    },
    negative: {
      default: baseColor.primary.red,
      highlight: baseColor.primary.red,
    },
    pressed: {
      background: baseColor.neutral.grey5,
    },
  },
  screen: {
    background: {
      default: baseColor.neutral.grey5,
      settings: baseColor.neutral.grey4,
    },
  },
  severity: {
    positive: baseColor.support.valid,
    negative: baseColor.support.invalid,
  },
  text: {
    default: baseColor.primary.white,
    inverse: baseColor.primary.black,
    link: baseColor.primary.blue,
    secondary: baseColor.neutral.grey1,
    tertiary: baseColor.neutral.grey2,
    warning: baseColor.support.invalid,
  },
}
