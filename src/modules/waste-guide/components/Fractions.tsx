import {Column} from '@/components/ui/layout'
import {Fraction} from '@/modules/waste-guide/components'
import {
  FractionCode,
  WasteGuideResponseFraction,
} from '@/modules/waste-guide/types'

const temporarilyDisabledFraction = FractionCode.Plastic // TODO: Remove when plastic is supported again

type Props = {
  wasteGuide: WasteGuideResponseFraction[]
}

export const Fractions = ({wasteGuide}: Props) => (
  <Column gutter="xxl">
    {wasteGuide
      .filter(w => w.afvalwijzerFractieCode !== temporarilyDisabledFraction)
      .map(fraction => (
        <Fraction fraction={fraction} key={fraction.afvalwijzerFractieCode} />
      ))}
  </Column>
)
