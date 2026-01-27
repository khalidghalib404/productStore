// Theme Store Usage Examples

// Basic usage in any component:
import { useThemeStore } from '../stores/themeStore';

function MyComponent() {
  const { currentTheme, setTheme, themes } = useThemeStore();

  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <button onClick={() => setTheme('forest')}>
        Switch to Forest Theme
      </button>
    </div>
  );
}

// Using the custom hook (recommended):
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const {
    currentTheme,
    setTheme,
    themes,
    isDark,
    isLight,
    toggleDarkLight,
    nextTheme,
    prevTheme
  } = useTheme();

  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <p>Is dark theme: {isDark ? 'Yes' : 'No'}</p>

      <button onClick={toggleDarkLight}>
        Toggle Dark/Light
      </button>

      <button onClick={nextTheme}>
        Next Theme
      </button>

      <button onClick={prevTheme}>
        Previous Theme
      </button>

      {/* All available themes */}
      {themes.map(theme => (
        <button
          key={theme}
          onClick={() => setTheme(theme)}
          className={currentTheme === theme ? 'active' : ''}
        >
          {theme}
        </button>
      ))}
    </div>
  );
}

// Available themes (32 total):
// "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
// "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
// "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
// "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
// "night", "coffee", "winter", "dim", "nord", "sunset"