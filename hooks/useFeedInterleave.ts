import { useMemo } from 'react';
import { FeedItem, NewsItem, MovieItem, SocialPost, GNewsArticle, TMDBMovie } from '@/types';

export function transformNewsArticle(article: GNewsArticle, index: number): NewsItem {
  return {
    id: `news-${article.url}-${index}`,
    type: 'news',
    title: article.title,
    description: article.description,
    content: article.content,
    image: article.image,
    url: article.url,
    source: article.source,
    publishedAt: article.publishedAt,
  };
}

export function transformTMDBMovie(movie: TMDBMovie): MovieItem {
  return {
    id: `movie-${movie.id}`,
    type: 'movie',
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    release_date: movie.release_date,
    genre_ids: movie.genre_ids,
    popularity: movie.popularity,
  };
}

export function useFeedInterleave(
  news: NewsItem[],
  movies: MovieItem[],
  socialPosts: SocialPost[]
): FeedItem[] {
  return useMemo(() => {
    const result: FeedItem[] = [];
    let ni = 0;
    let mi = 0;
    let si = 0;

    // Pattern: news, movie, news, social, movie (repeat)
    const pattern: ('news' | 'movie' | 'social')[] = [
      'news',
      'movie',
      'news',
      'social',
      'movie',
    ];

    const totalItems = news.length + movies.length + socialPosts.length;

    while (result.length < totalItems) {
      const patternIndex = result.length % pattern.length;
      const type = pattern[patternIndex];

      if (type === 'news' && ni < news.length) {
        result.push(news[ni++]);
      } else if (type === 'movie' && mi < movies.length) {
        result.push(movies[mi++]);
      } else if (type === 'social' && si < socialPosts.length) {
        result.push(socialPosts[si++]);
      } else {
        // Fallback: pick from whichever source has remaining items
        if (ni < news.length) {
          result.push(news[ni++]);
        } else if (mi < movies.length) {
          result.push(movies[mi++]);
        } else if (si < socialPosts.length) {
          result.push(socialPosts[si++]);
        } else {
          break;
        }
      }
    }

    return result;
  }, [news, movies, socialPosts]);
}
