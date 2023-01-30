import React, {useMemo} from 'react'
import {Pressable, StyleSheet, View, ViewProps} from 'react-native'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {Column, Row} from '@/components/ui/layout'
import {FigureWithFacadesBackground, Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {recentArticleMaxAge} from '@/modules/construction-work/config'
import {selectConstructionWorkReadArticles} from '@/modules/construction-work/slice'
import {ArticleSummary} from '@/modules/construction-work/types'
import {useEnvironment} from '@/store'
import {Theme, useThemable, useTheme} from '@/themes'
import {
  formatDateToDisplay,
  getDateDiffInDays,
  mapImageSources,
  mapWarningImageSources,
} from '@/utils'

type Props = {
  article: ArticleSummary
  isFirst: boolean
  isLast: boolean
  onPress: () => void
  testID?: ViewProps['testID']
}

export const ArticlePreview = ({
  article,
  isFirst,
  isLast,
  onPress,
  testID,
}: Props) => {
  const environment = useEnvironment()
  const readArticles = useSelector(selectConstructionWorkReadArticles)

  const getImageSources = () => {
    if (article.type === 'news') {
      return mapImageSources(article.image?.sources, environment)
    }
    const mainImageFromProjectWarning = article?.images?.find(
      image => image.main,
    )
    return mapWarningImageSources(
      mainImageFromProjectWarning?.sources,
      environment,
    )
  }

  const imageSources = getImageSources()

  const isNewAndUnreadArticle = useMemo(
    () =>
      getDateDiffInDays(article.publication_date) <= recentArticleMaxAge &&
      !readArticles.find(readArticle => readArticle.id === article.identifier),
    [article.identifier, article.publication_date, readArticles],
  )

  const {media} = useTheme()
  const imageWidth = media.figureHeight.lg
  const imageHeight = imageWidth / media.aspectRatio.extraWide
  const styles = useThemable(
    createStyles({isFirst, isLast}, imageWidth, isNewAndUnreadArticle),
  )

  const createTestID = (suffix = '') =>
    testID ? [testID, suffix, article.identifier].join() : undefined

  return (
    <View style={styles.item} testID={createTestID()}>
      <View style={styles.line} />
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={styles.button}>
        <Column gutter="sm">
          <Row gutter="md" valign="center">
            <View style={styles.horizontalLine} />
            {!!isNewAndUnreadArticle && (
              <View style={styles.update}>
                <Paragraph>Nieuw</Paragraph>
              </View>
            )}
            <Paragraph testID={createTestID('Date')}>
              {formatDateToDisplay(article.publication_date)}
            </Paragraph>
          </Row>
          <Box insetHorizontal="md">
            <Column gutter="sm">
              <Title
                color="link"
                level="h5"
                testID={createTestID('Title')}
                text={article.title}
              />
              <View style={styles.image}>
                {imageSources && Object.keys(imageSources[0]).length ? (
                  <Image
                    aspectRatio="extraWide"
                    source={imageSources}
                    testID={createTestID('Image')}
                  />
                ) : (
                  <FigureWithFacadesBackground
                    aspectRatio="extraWide"
                    height={imageHeight}
                    Image={<ProjectWarningFallbackImage />}
                    imageAspectRatio={
                      media.imageAspectRatio.projectWarningFallback
                    }
                    testID={createTestID('Image')}
                  />
                )}
              </View>
            </Column>
          </Box>
        </Column>
      </Pressable>
    </View>
  )
}

const lineThickness = 2
const verticalLineTopWithAlert = 18
const verticalLineTopWithoutAlert = 15

const createStyles =
  (
    {isFirst, isLast}: Partial<Props>,
    imageWidth: number,
    isNewAndUnreadArticle: boolean | undefined,
  ) =>
  ({color, size}: Theme) => {
    const itemBottomInset = isLast ? 0 : size.spacing.xl
    return StyleSheet.create({
      button: {
        paddingLeft: size.spacing.md,
      },
      horizontalLine: {
        position: 'absolute',
        left: -size.spacing.md,
        height: lineThickness,
        width: size.spacing.md,
        backgroundColor: color.text.default,
      },
      image: {
        width: imageWidth,
      },
      item: {
        paddingBottom: itemBottomInset,
      },
      line: {
        bottom: -itemBottomInset,
        position: 'absolute',
        top: isFirst
          ? isNewAndUnreadArticle
            ? verticalLineTopWithAlert
            : verticalLineTopWithoutAlert
          : 0,
        left: 0,
        zIndex: -1,
        width: lineThickness,
        backgroundColor: color.text.default,
      },
      update: {
        backgroundColor: color.box.background.alert,
        paddingHorizontal: size.spacing.sm,
        paddingVertical: size.spacing.xs,
      },
    })
  }
