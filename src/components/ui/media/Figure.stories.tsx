import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Figure} from './Figure'
import {TwoPeopleBringingHouseholdWasteImage} from '@/modules/waste-guide/assets/images'

export default {
  component: Figure,
} as ComponentMeta<typeof Figure>

export const Default: ComponentStory<typeof Figure> = args => (
  <Figure {...args}>
    <TwoPeopleBringingHouseholdWasteImage />
  </Figure>
)
Default.args = {
  aspectRatio: 'default',
  height: 256,
}
