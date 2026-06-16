import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SocialPost } from '@/types';
import { socialPosts } from '@/data/socialPosts';

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Social'],
  endpoints: (builder) => ({
    getSocialPosts: builder.query<SocialPost[], void>({
      queryFn: async () => {
        // Simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 150));
        return { data: socialPosts };
      },
      providesTags: ['Social'],
    }),
  }),
});

export const { useGetSocialPostsQuery } = socialApi;
export default socialApi;
