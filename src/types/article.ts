import {Image} from '.'

export type Article = {
  identifier: string
  image: Image | null
  publication_date: string
  title: string
  type: 'news' | 'warning'
}

export type ArticleApiResponse = {
  status: boolean
  result: Article[]
}

export type ArticleApiQuery = {
  'project-ids'?: string[]
  limit?: number
  'sort-by'?: string
  'sort-order'?: 'asc' | 'desc'
}
