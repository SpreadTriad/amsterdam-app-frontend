import {AddressQueryArg} from '@/modules/address/types'
import {
  ArticleQueryArg,
  Articles,
  FieldsQueryArg,
  FollowProjectBody,
  NewsArticle,
  Project,
  ProjectIdQueryArg,
  ProjectsByTextQueryArg,
  ProjectsEndpointName,
  ProjectsFollowedArticlesQueryArg,
  ProjectsFollowedArticlesResponse,
  ProjectsItem,
  ProjectsQueryArg,
  ProjectWarning,
  ProjectWarningIdQueryArg,
} from '@/modules/construction-work/types'
import {baseApi} from '@/services/init'
import {CacheLifetime, MutationResponse, Paginated} from '@/types/api'
import {SortListQueryArg} from '@/types/list'
import {formatQueryParams, generateRequestUrl} from '@/utils/api'

export const projectsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ProjectsEndpointName.followProject]: builder.mutation<
      MutationResponse,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        url: '/projects/follow',
        method: 'POST',
        body,
      }),
    }),

    [ProjectsEndpointName.getArticles]: builder.query<
      Articles,
      ArticleQueryArg
    >({
      providesTags: ['Articles'],
      query: params => {
        const q = formatQueryParams(params)

        return generateRequestUrl({path: '/articles', params: q})
      },
      keepUnusedDataFor: CacheLifetime.minute,
      transformResponse: (response: {result: Articles}) => response.result,
    }),

    [ProjectsEndpointName.getProject]: builder.query<
      Project,
      ProjectIdQueryArg & AddressQueryArg
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => generateRequestUrl({path: '/project/details', params}),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {result: Project}) => response.result,
    }),

    [ProjectsEndpointName.getProjectNews]: builder.query<
      NewsArticle,
      ProjectIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/news', params}),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {result: NewsArticle}) => response.result,
    }),

    [ProjectsEndpointName.getProjects]: builder.query<
      Paginated<ProjectsItem>,
      Partial<
        ProjectsQueryArg & AddressQueryArg & FieldsQueryArg & SortListQueryArg
      > | void
    >({
      providesTags: ['FollowedProjects', 'Projects'],
      query: params => {
        if (params) {
          return generateRequestUrl({
            path: '/projects',
            params: formatQueryParams({...params}),
          })
        }

        return '/projects'
      },
      keepUnusedDataFor: CacheLifetime.hour,
    }),

    [ProjectsEndpointName.getProjectsFollowedArticles]: builder.query<
      ProjectsFollowedArticlesResponse,
      ProjectsFollowedArticlesQueryArg | void
    >({
      providesTags: ['Articles', 'FollowedProjects'],
      query: params => {
        const path = '/projects/followed/articles'

        if (params) {
          return generateRequestUrl({
            path,
            params,
          })
        }

        return path
      },
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {
        result: ProjectsFollowedArticlesResponse
      }) => response.result,
    }),

    [ProjectsEndpointName.getProjectsByText]: builder.query<
      ProjectsItem[],
      ProjectsByTextQueryArg & FieldsQueryArg
    >({
      providesTags: ['Projects'],
      query: params =>
        generateRequestUrl({
          path: '/projects/search',
          params: formatQueryParams({...params, page_size: 1000}),
        }),

      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {result: ProjectsItem[]}) =>
        response.result,
    }),

    [ProjectsEndpointName.getProjectWarning]: builder.query<
      ProjectWarning,
      ProjectWarningIdQueryArg
    >({
      query: params => generateRequestUrl({path: '/project/warning', params}),
      keepUnusedDataFor: CacheLifetime.week,
      transformResponse: (response: {result: ProjectWarning}) =>
        response.result,
    }),

    [ProjectsEndpointName.unfollowProject]: builder.mutation<
      MutationResponse,
      FollowProjectBody
    >({
      invalidatesTags: ['FollowedProjects'],
      query: body => ({
        url: '/projects/follow',
        method: 'DELETE',
        body,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useFollowProjectMutation,
  useGetArticlesQuery,
  useGetProjectNewsQuery,
  useGetProjectQuery,
  useGetProjectWarningQuery,
  useGetProjectsByTextQuery,
  useGetProjectsQuery,
  useGetProjectsFollowedArticlesQuery,
  useUnfollowProjectMutation,
} = projectsApi
