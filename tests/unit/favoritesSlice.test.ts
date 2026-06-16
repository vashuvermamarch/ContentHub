import favoritesReducer, {
  addFavorite,
  removeFavorite,
  toggleFavorite,
} from '@/redux/slices/favoritesSlice';
import { FavoritesState, NewsItem, MovieItem } from '@/types';

const mockNewsItem: NewsItem = {
  id: 'news-test-1',
  type: 'news',
  title: 'Test News Article',
  description: 'A test description',
  content: 'Test content',
  image: 'https://example.com/image.jpg',
  url: 'https://example.com/article',
  source: { name: 'TestSource', url: 'https://example.com' },
  publishedAt: '2025-06-15T10:00:00Z',
};

const mockMovieItem: MovieItem = {
  id: 'movie-123',
  type: 'movie',
  title: 'Test Movie',
  overview: 'A test movie overview',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.5,
  vote_count: 1000,
  release_date: '2025-03-15',
  genre_ids: [28, 12],
  popularity: 100,
};

describe('favoritesSlice', () => {
  const initialState: FavoritesState = { items: [] };

  it('should return the initial state', () => {
    const state = favoritesReducer(undefined, { type: 'unknown' });
    expect(state.items).toEqual([]);
  });

  it('should add a favorite', () => {
    const state = favoritesReducer(initialState, addFavorite(mockNewsItem));
    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe('news-test-1');
  });

  it('should not add duplicate favorites', () => {
    const stateWithItem: FavoritesState = { items: [mockNewsItem] };
    const state = favoritesReducer(stateWithItem, addFavorite(mockNewsItem));
    expect(state.items.length).toBe(1);
  });

  it('should remove a favorite by id', () => {
    const stateWithItems: FavoritesState = {
      items: [mockNewsItem, mockMovieItem],
    };
    const state = favoritesReducer(
      stateWithItems,
      removeFavorite('news-test-1')
    );
    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe('movie-123');
  });

  it('should toggle favorite (add when not present)', () => {
    const state = favoritesReducer(initialState, toggleFavorite(mockNewsItem));
    expect(state.items.length).toBe(1);
  });

  it('should toggle favorite (remove when present)', () => {
    const stateWithItem: FavoritesState = { items: [mockNewsItem] };
    const state = favoritesReducer(stateWithItem, toggleFavorite(mockNewsItem));
    expect(state.items.length).toBe(0);
  });
});
