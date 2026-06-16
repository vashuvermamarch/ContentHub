import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PreferencesState, CategoryType } from '@/types';

const initialState: PreferencesState = {
  categories: ['technology', 'ai', 'entertainment'],
  darkMode: true,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    setCategories(state, action: PayloadAction<CategoryType[]>) {
      state.categories = action.payload;
    },
    toggleCategory(state, action: PayloadAction<CategoryType>) {
      const category = action.payload;
      const index = state.categories.indexOf(category);
      if (index >= 0) {
        state.categories.splice(index, 1);
      } else {
        state.categories.push(category);
      }
    },
  },
});

export const { toggleDarkMode, setDarkMode, setCategories, toggleCategory } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;
