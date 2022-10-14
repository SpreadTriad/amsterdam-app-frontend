import {ComponentMeta, ComponentStory} from '@storybook/react'
import React from 'react'
import {Button} from './Button'
import {ButtonRow} from '@/components/ui/buttons/ButtonRow'

export default {
  component: ButtonRow,
} as ComponentMeta<typeof ButtonRow>

export const Default: ComponentStory<typeof Button & typeof ButtonRow> = () => (
  <ButtonRow>
    <Button label="Wijzig adres" />
    <Button label="Voeg adres toe" variant="secondary" />
    <Button label="Verwijder adres" variant="secondary" />
  </ButtonRow>
)
