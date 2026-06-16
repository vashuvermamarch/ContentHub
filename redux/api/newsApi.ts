import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GNewsResponse } from '@/types';

const GNEWS_API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gnews.io/api/v4/' }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<
      GNewsResponse,
      { category?: string; max?: number; page?: number }
    >({
      query: ({ category = 'general', max = 10 }) => ({
        url: 'top-headlines',
        params: {
          category,
          lang: 'en',
          max,
          apikey: GNEWS_API_KEY,
        },
      }),
      providesTags: ['News'],
    }),
    searchNews: builder.query<
      GNewsResponse,
      { q: string; max?: number; page?: number }
    >({
      query: ({ q, max = 10 }) => ({
        url: 'search',
        params: {
          q,
          lang: 'en',
          max,
          apikey: GNEWS_API_KEY,
        },
      }),
      providesTags: ['News'],
    }),
  }),
});

export const { useGetTopHeadlinesQuery, useSearchNewsQuery } = newsApi;
