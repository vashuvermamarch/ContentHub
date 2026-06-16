import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TMDBResponse } from '@/types';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getTrending: builder.query<TMDBResponse, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: 'trending/movie/week',
        params: {
          api_key: TMDB_API_KEY,
          page,
        },
      }),
      providesTags: ['Movies'],
    }),
    searchMovies: builder.query<
      TMDBResponse,
      { query: string; page?: number }
    >({
      query: ({ query, page = 1 }) => ({
        url: 'search/movie',
        params: {
          api_key: TMDB_API_KEY,
          query,
          page,
        },
      }),
      providesTags: ['Movies'],
    }),
    getPopular: builder.query<TMDBResponse, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: 'movie/popular',
        params: {
          api_key: TMDB_API_KEY,
          page,
        },
      }),
      providesTags: ['Movies'],
    }),
  }),
});

export const { useGetTrendingQuery, useSearchMoviesQuery, useGetPopularQuery } =
  tmdbApi;
