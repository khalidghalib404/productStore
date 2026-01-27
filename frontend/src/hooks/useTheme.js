import { useThemeStore } from '../stores/themeStore';

// Custom hook for theme management
export const useTheme = () => {
  const {
    currentTheme,
    themes,
    themeColors,
    setTheme,
    getThemeColors
  } = useThemeStore();

  const isDark = ['dark', 'dracula', 'night', 'black', 'coffee'].includes(currentTheme);
  const isLight = currentTheme === 'light';

  return {
    currentTheme,
    themes,
    themeColors,
    setTheme,
    getThemeColors,
    isDark,
    isLight,
    // Utility functions
    toggleDarkLight: () => setTheme(isDark ? 'light' : 'dark'),
    nextTheme: () => {
      const currentIndex = themes.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      setTheme(themes[nextIndex]);
    },
    prevTheme: () => {
      const currentIndex = themes.indexOf(currentTheme);
      const prevIndex = currentIndex === 0 ? themes.length - 1 : currentIndex - 1;
      setTheme(themes[prevIndex]);
    }
  };
};