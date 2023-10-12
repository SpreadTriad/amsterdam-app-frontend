import {Meta, StoryObj} from '@storybook/react'
import {Button} from './Button'
import {Row} from '@/components/ui/layout/Row'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'

const meta: Meta<typeof Button> = {
  argTypes: pressableArgTypes,
  component: Button,
}

export default meta

type Story<T extends typeof Row | void = void> = StoryObj<typeof Button & T>

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  args: {
    label: 'Tertiary',
    variant: 'tertiary',
  },
}

export const _Inline: Story<typeof Row> = {
  args: {align: 'start'},
  render: ({align}) => (
    <Row align={align}>
      <Button label="Inline button" />
    </Row>
  ),
}

export const __Alignment: Story<typeof Row> = {
  args: {
    align: 'start',
    gutter: 'md',
  },
  render: ({align, gutter}) => (
    <Row
      align={align}
      gutter={gutter}>
      <Button label="First button" />
      <Button
        label="Second button"
        variant="secondary"
      />
      <Button
        label="Third button"
        variant="tertiary"
      />
    </Row>
  ),
}

export const __WithIcon: Story = {
  args: {
    iconName: 'phone',
    label: 'Bel ons',
  },
  render: args => (
    <Row align="start">
      <Button {...args} />
    </Row>
  ),
}
