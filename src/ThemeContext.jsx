// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the theme
const ThemeContext = createContext();

// Provide the theme to the entire app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default to light theme

  useEffect(() => {
    // Load saved theme from localStorage (if any)
    const savedTheme = localStorage.getItem('colorScheme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Save theme preference to localStorage whenever it changes
    localStorage.setItem('colorScheme', theme);

    // Apply theme to the body
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
