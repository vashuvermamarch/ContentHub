import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedState, FeedItem } from '@/types';

const initialState: FeedState = {
  items: [],
  order: [],
  searchQuery: '',
  newsPage: 1,
  moviesPage: 1,
  hasMoreNews: true,
  hasMoreMovies: true,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedItems(state, action: PayloadAction<FeedItem[]>) {
      state.items = action.payload;
      state.order = action.payload.map((item) => item.id);
    },
    appendFeedItems(state, action: PayloadAction<FeedItem[]>) {
      const newItems = action.payload.filter(
        (item) => !state.items.some((existing) => existing.id === item.id)
      );
      state.items.push(...newItems);
      state.order.push(...newItems.map((item) => item.id));
    },
    reorderItems(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedId = state.order[dragIndex];
      state.order.splice(dragIndex, 1);
      state.order.splice(hoverIndex, 0, draggedId);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    incrementNewsPage(state) {
      state.newsPage += 1;
    },
    incrementMoviesPage(state) {
      state.moviesPage += 1;
    },
    setHasMoreNews(state, action: PayloadAction<boolean>) {
      state.hasMoreNews = action.payload;
    },
    setHasMoreMovies(state, action: PayloadAction<boolean>) {
      state.hasMoreMovies = action.payload;
    },
    resetFeed(state) {
      state.items = [];
      state.order = [];
      state.newsPage = 1;
      state.moviesPage = 1;
      state.hasMoreNews = true;
      state.hasMoreMovies = true;
    },
  },
});

export const {
  setFeedItems,
  appendFeedItems,
  reorderItems,
  setSearchQuery,
  incrementNewsPage,
  incrementMoviesPage,
  setHasMoreNews,
  setHasMoreMovies,
  resetFeed,
} = feedSlice.actions;
export default feedSlice.reducer;
