import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset"
];

// Color indicators for each theme
const themeColors = {
  light: ['#ffffff', '#3b82f6'],
  dark: ['#1f2937', '#60a5fa'],
  cupcake: ['#faf7f5', '#f472b6'],
  bumblebee: ['#fef3c7', '#f59e0b'],
  emerald: ['#ecfdf5', '#10b981'],
  corporate: ['#f8fafc', '#1e293b'],
  synthwave: ['#2d1b69', '#ff007f'],
  retro: ['#e6e6e6', '#ff6b6b'],
  cyberpunk: ['#0d001a', '#00ff9f'],
  valentine: ['#fff5f5', '#f472b6'],
  halloween: ['#2d1b1b', '#ff6b35'],
  garden: ['#f0fdf4', '#16a34a'],
  forest: ['#1a2e1f', '#22c55e'],
  aqua: ['#f0f9ff', '#06b6d4'],
  lofi: ['#f5f5f4', '#78716c'],
  pastel: ['#fef7ed', '#f97316'],
  fantasy: ['#fef3c7', '#eab308'],
  wireframe: ['#ffffff', '#6b7280'],
  black: ['#000000', '#ffffff'],
  luxury: ['#1a1a1a', '#ffd700'],
  dracula: ['#282a36', '#ff79c6'],
  cmyk: ['#ffffff', '#00ffff'],
  autumn: ['#fef3c7', '#ea580c'],
  business: ['#f8fafc', '#0f172a'],
  acid: ['#f0fdf4', '#84cc16'],
  lemonade: ['#fefce8', '#eab308'],
  night: ['#0f0f23', '#00ff9f'],
  coffee: ['#2d1b1b', '#a16207'],
  winter: ['#f0f9ff', '#3b82f6'],
  dim: ['#1a1a2e', '#a855f7'],
  nord: ['#2e3440', '#88c0d0'],
  sunset: ['#1e1b4b', '#f59e0b']
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      currentTheme: 'light',
      themes,
      themeColors,

      setTheme: (theme) => {
        console.log('Setting theme to:', theme);
        set({ currentTheme: theme });
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        console.log('data-theme attribute set to:', document.documentElement.getAttribute('data-theme'));
      },

      getThemeColors: (theme) => {
        return get().themeColors[theme] || ['#ffffff', '#3b82f6'];
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme on rehydration
        if (state?.currentTheme) {
          document.documentElement.setAttribute('data-theme', state.currentTheme);
        }
      },
    }
  )
);

// Initialize theme on app start
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme-storage');
  if (savedTheme) {
    try {
      const parsed = JSON.parse(savedTheme);
      if (parsed.state?.currentTheme) {
        document.documentElement.setAttribute('data-theme', parsed.state.currentTheme);
      }
    } catch (e) {
      // Fallback to light theme
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}