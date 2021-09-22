import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Fragment} from 'react'
import {RootStackParamList, routes} from '../../../../App'
import {getEnvironment} from '../../../environment'
import {useFetch} from '../../../hooks'
import {size} from '../../../tokens'
import {NewsArticleList} from '../../../types'
import {Box, Gutter, Title} from '../../ui'
import {NewsArticleOverviewItem} from './'

type Props = {
  projectId: string
}

export const NewsArticleOverview = ({projectId}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectNews'>>()
  const news = useFetch<NewsArticleList>({
    url: getEnvironment().apiUrl + '/project/news',
    options: {
      params: {'project-identifier': projectId},
    },
  })

  if (!news.data || !news.data?.length) {
    return null
  }

  return (
    <Box>
      <Gutter height={size.spacing.md} />
      <Title level={2} text="Nieuws" />
      <Gutter height={size.spacing.sm} />
      {news.data.map((article, index) => (
        <Fragment key={article.title}>
          <NewsArticleOverviewItem
            newsArticle={article}
            onPress={() =>
              navigation.navigate(routes.projectNews.name, {article})
            }
          />
          {index < news.data!.length - 1 && <Gutter height={size.spacing.md} />}
        </Fragment>
      ))}
    </Box>
  )
}
