import feedReducer, {
  setFeedItems,
  appendFeedItems,
  reorderItems,
  setSearchQuery,
  incrementNewsPage,
  incrementMoviesPage,
  setHasMoreNews,
  setHasMoreMovies,
  resetFeed,
} from '@/redux/slices/feedSlice';
import { FeedState, NewsItem, SocialPost } from '@/types';

const mockItem1: NewsItem = {
  id: 'news-1',
  type: 'news',
  title: 'Item 1',
  description: '',
  content: '',
  image: null,
  url: '',
  source: { name: 'Src', url: '' },
  publishedAt: '',
};

const mockItem2: SocialPost = {
  id: 'social-1',
  type: 'social',
  author: 'Author',
  handle: '@author',
  avatar: '',
  hashtag: '#test',
  content: 'Content',
  timestamp: '',
  likes: 0,
  retweets: 0,
  comments: 0,
};

const mockItem3: NewsItem = {
  id: 'news-2',
  type: 'news',
  title: 'Item 3',
  description: '',
  content: '',
  image: null,
  url: '',
  source: { name: 'Src', url: '' },
  publishedAt: '',
};

describe('feedSlice', () => {
  it('should return the initial state', () => {
    const state = feedReducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
    expect(state.order).toEqual([]);
    expect(state.searchQuery).toBe('');
  });

  it('should set feed items and order', () => {
    const state = feedReducer(
      undefined,
      setFeedItems([mockItem1, mockItem2, mockItem3])
    );
    expect(state.items.length).toBe(3);
    expect(state.order).toEqual(['news-1', 'social-1', 'news-2']);
  });

  it('should append feed items without duplicates', () => {
    const initial: FeedState = {
      items: [mockItem1],
      order: ['news-1'],
      searchQuery: '',
      newsPage: 1,
      moviesPage: 1,
      hasMoreNews: true,
      hasMoreMovies: true,
    };
    const state = feedReducer(
      initial,
      appendFeedItems([mockItem1, mockItem2])
    );
    expect(state.items.length).toBe(2); // only mockItem2 added
    expect(state.order).toEqual(['news-1', 'social-1']);
  });

  it('should reorder items correctly', () => {
    const initial: FeedState = {
      items: [mockItem1, mockItem2, mockItem3],
      order: ['news-1', 'social-1', 'news-2'],
      searchQuery: '',
      newsPage: 1,
      moviesPage: 1,
      hasMoreNews: true,
      hasMoreMovies: true,
    };
    // Move item at index 2 to index 0
    const state = feedReducer(
      initial,
      reorderItems({ dragIndex: 2, hoverIndex: 0 })
    );
    expect(state.order).toEqual(['news-2', 'news-1', 'social-1']);
  });

  it('should set search query', () => {
    const state = feedReducer(undefined, setSearchQuery('OpenAI'));
    expect(state.searchQuery).toBe('OpenAI');
  });

  it('should increment page numbers', () => {
    let state = feedReducer(undefined, incrementNewsPage());
    expect(state.newsPage).toBe(2);
    state = feedReducer(state, incrementMoviesPage());
    expect(state.moviesPage).toBe(2);
  });

  it('should set hasMore flags', () => {
    let state = feedReducer(undefined, setHasMoreNews(false));
    expect(state.hasMoreNews).toBe(false);
    state = feedReducer(state, setHasMoreMovies(false));
    expect(state.hasMoreMovies).toBe(false);
  });

  it('should reset feed state', () => {
    const modified: FeedState = {
      items: [mockItem1],
      order: ['news-1'],
      searchQuery: 'test',
      newsPage: 3,
      moviesPage: 2,
      hasMoreNews: false,
      hasMoreMovies: false,
    };
    const state = feedReducer(modified, resetFeed());
    expect(state.items).toEqual([]);
    expect(state.order).toEqual([]);
    expect(state.newsPage).toBe(1);
    expect(state.moviesPage).toBe(1);
    expect(state.hasMoreNews).toBe(true);
    expect(state.hasMoreMovies).toBe(true);
  });
});
