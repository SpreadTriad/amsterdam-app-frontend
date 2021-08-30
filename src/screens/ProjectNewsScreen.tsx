import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, useWindowDimensions} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, Image, Title} from '../components/ui'
import {tagsStyles} from '../styles/html'
import {font, image} from '../tokens'

type ProjectNewsScreenRouteProp = RouteProp<RootStackParamList, 'ProjectNews'>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => {
  const {article} = route.params
  const {width} = useWindowDimensions()

  return (
    <ScrollView>
      <Image source={{uri: article.image_url}} style={styles.image} />
      <Box>
        <Title margin text={article.title} />
        <RenderHTML
          contentWidth={width}
          source={{html: article.content}}
          systemFonts={[font.weight.regular, font.weight.demi]}
          tagsStyles={tagsStyles}
        />
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
  },
})
