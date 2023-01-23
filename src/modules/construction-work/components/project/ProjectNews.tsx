import {useNavigation} from '@react-navigation/native'
import {useEffect, useLayoutEffect} from 'react'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {PleaseWait} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Article, Paragraph, Title} from '@/components/ui/text'
import {useMarkArticleAsRead} from '@/modules/construction-work/hooks'
import {
  useGetProjectNewsQuery,
  useGetProjectQuery,
} from '@/modules/construction-work/service'
import {useEnvironment} from '@/store'
import {formatDate, mapImageSources} from '@/utils'

type Props = {
  id: string
}

export const ProjectNews = ({id}: Props) => {
  const navigation = useNavigation()
  const {markAsRead} = useMarkArticleAsRead()

  const {data: news, isLoading: newsIsLoading} = useGetProjectNewsQuery({
    id,
  })

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: news?.project_identifier ?? '',
    },
    {skip: !news},
  )

  useEffect(() => {
    news &&
      markAsRead({
        id: news.identifier,
        publicationDate: news.publication_date,
      })
  }, [markAsRead, news])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: project?.title ?? '',
    })
  })

  const environment = useEnvironment()

  if (newsIsLoading || projectIsLoading || !news) {
    return <PleaseWait />
  }

  return (
    <>
      {news?.images?.length ? (
        <Image
          aspectRatio="wide"
          source={mapImageSources(news.images[0].sources, environment)}
        />
      ) : null}
      {!!news && (
        <HorizontalSafeArea>
          <Box>
            <Column gutter="md">
              <Paragraph>{formatDate(news.publication_date)}</Paragraph>
              <Title text={news.title} />
              <Article content={news.body?.preface.html} isIntro />
              <Article content={news.body?.content.html} />
            </Column>
          </Box>
        </HorizontalSafeArea>
      )}
    </>
  )
}
