import preferencesReducer, {
  toggleDarkMode,
  setDarkMode,
  setCategories,
  toggleCategory,
} from '@/redux/slices/preferencesSlice';
import { PreferencesState, CategoryType } from '@/types';

describe('preferencesSlice', () => {
  const initialState: PreferencesState = {
    categories: ['technology', 'ai', 'entertainment'],
    darkMode: true,
  };

  it('should return the initial state', () => {
    const state = preferencesReducer(undefined, { type: 'unknown' });
    expect(state.darkMode).toBe(true);
    expect(state.categories).toContain('technology');
  });

  it('should toggle dark mode', () => {
    const state = preferencesReducer(initialState, toggleDarkMode());
    expect(state.darkMode).toBe(false);

    const state2 = preferencesReducer(state, toggleDarkMode());
    expect(state2.darkMode).toBe(true);
  });

  it('should set dark mode to specific value', () => {
    const state = preferencesReducer(initialState, setDarkMode(false));
    expect(state.darkMode).toBe(false);
  });

  it('should set categories', () => {
    const newCategories: CategoryType[] = ['sports', 'finance'];
    const state = preferencesReducer(initialState, setCategories(newCategories));
    expect(state.categories).toEqual(['sports', 'finance']);
  });

  it('should add a category when toggling a non-existent one', () => {
    const state = preferencesReducer(initialState, toggleCategory('sports'));
    expect(state.categories).toContain('sports');
    expect(state.categories.length).toBe(4);
  });

  it('should remove a category when toggling an existing one', () => {
    const state = preferencesReducer(initialState, toggleCategory('technology'));
    expect(state.categories).not.toContain('technology');
    expect(state.categories.length).toBe(2);
  });
});
