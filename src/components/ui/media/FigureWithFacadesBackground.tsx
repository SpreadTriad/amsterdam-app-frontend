import React, {ReactNode} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {
  AmsterdamAndWeespFacadesImage,
  AmsterdamFacadesImage,
} from '@/assets/images'
import {mapSelfAlignment} from '@/components/ui/layout'
import {Figure, FigureProps} from '@/components/ui/media/Figure'
import {Theme, useThemable} from '@/themes'

type SelectedFigureProps = Pick<FigureProps, 'aspectRatio'> &
  Required<Pick<FigureProps, 'height'>>

type Props = {
  backgroundImageHeightFraction?: number
  Image: ReactNode
  imageAlign?: 'start' | 'center' | 'end'
  imageAspectRatio: number
  imageWidth?: number
  /**
   * The number of pixels by which to move the figure up, sliding behind the content above it.
   * This is especially useful on landscape devices.
   */
  moveUp?: number
  testID?: ViewProps['testID']
  withWeesp?: boolean
} & SelectedFigureProps

export const FigureWithFacadesBackground = ({
  backgroundImageHeightFraction = 5 / 6,
  Image,
  imageAlign = 'center',
  imageAspectRatio,
  imageWidth,
  moveUp,
  testID,
  withWeesp = false,
  ...figureProps
}: Props) => {
  const styles = useThemable(
    createStyles(
      backgroundImageHeightFraction,
      imageAlign,
      imageAspectRatio,
      figureProps,
      moveUp,
      imageWidth,
    ),
  )

  const BackgroundImage = withWeesp
    ? AmsterdamAndWeespFacadesImage
    : AmsterdamFacadesImage

  return (
    <View style={styles.figure} testID={testID}>
      <Figure {...figureProps}>
        <View style={styles.backgroundImage}>
          <BackgroundImage />
        </View>
        <View style={styles.image}>{Image}</View>
      </Figure>
    </View>
  )
}

const createStyles =
  (
    backgroundImageHeightFraction: number,
    imageAlign: Props['imageAlign'],
    imageAspectRatio: Props['imageAspectRatio'],
    figureProps: SelectedFigureProps,
    moveUp: Props['moveUp'],
    requestedImageWidth: Props['imageWidth'],
  ) =>
  ({media}: Theme) => {
    const {aspectRatio, height: figureHeight} = figureProps
    const figureWidth = figureHeight * media.aspectRatio[aspectRatio ?? 'wide']
    const imageWidth = requestedImageWidth ?? figureWidth
    const imageHeight = imageWidth / imageAspectRatio
    const backgroundImageHeight = figureHeight * backgroundImageHeightFraction

    return StyleSheet.create({
      backgroundImage: {
        aspectRatio: media.imageAspectRatio.facades,
        position: 'absolute',
        height: backgroundImageHeight,
        alignSelf: 'center',
      },
      figure: {
        position: 'relative',
        marginTop: moveUp ? -moveUp : undefined,
        zIndex: moveUp ? -1 : undefined,
      },
      image: {
        position: 'absolute',
        bottom: 0,
        aspectRatio: imageAspectRatio,
        height: imageHeight,
        alignSelf: mapSelfAlignment(imageAlign),
      },
    })
  }
