import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import {ComponentMeta, ComponentStoryObj} from '@storybook/react'
import React from 'react'
import {IconButton} from './IconButton'
import {Icon} from '@/components/ui/media'

export default {
  component: IconButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as ComponentMeta<typeof IconButton>

export const Default: ComponentStoryObj<typeof IconButton> = {
  args: {
    badgeValue: 7,
    icon: (
      <Icon size={24}>
        <PersonalLogin fill="black" />
      </Icon>
    ),
  },
}
