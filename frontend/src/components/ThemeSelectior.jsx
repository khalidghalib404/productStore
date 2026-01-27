import React, { useState, useEffect } from 'react';
import { Palette, ChevronDown } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';

function ThemeSelectior() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, themes, themeColors, setTheme, getThemeColors } = useThemeStore();

  const selectTheme = (theme) => {
    setTheme(theme);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.theme-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative theme-selector">
      {/* Theme Selector Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 bg-base-200 hover:bg-base-300 rounded-lg transition-colors duration-200 min-w-[120px] justify-between"
        aria-label="Select theme"
      >
        <div className="flex items-center gap-2">
          <Palette size={16} />
          <span className="text-sm font-medium capitalize">{currentTheme}</span>
        </div>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 w-56 max-h-80 overflow-y-auto bg-base-100 border border-base-300 rounded-lg shadow-lg">
          <div className="p-2">
            <div className="text-xs font-semibold text-base-content/70 mb-2 px-2">Choose Theme</div>
            <div className="grid grid-cols-1 gap-1">
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => selectTheme(theme)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-150 capitalize flex items-center gap-3 ${
                    currentTheme === theme
                      ? 'bg-primary text-primary-content font-medium'
                      : 'hover:bg-base-200 text-base-content'
                  }`}
                >
                  {/* Color Indicator */}
                  <div className="flex gap-1 flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full border border-base-300"
                      style={{ backgroundColor: getThemeColors(theme)[0] }}
                      title={`${theme} primary color`}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full border border-base-300"
                      style={{ backgroundColor: getThemeColors(theme)[1] }}
                      title={`${theme} secondary color`}
                    ></div>
                  </div>
                  {/* Theme Name */}
                  <span className="flex-1">{theme}</span>
                  {/* Current theme indicator */}
                  {currentTheme === theme && (
                    <div className="w-2 h-2 bg-current rounded-full flex-shrink-0"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSelectior;