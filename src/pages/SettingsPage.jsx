// SettingsPage.js
import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext'; // Import the custom hook

const SettingsPage = () => {
  const { theme, setTheme } = useTheme(); // Access the current theme and the setter function
  const [showContent, setShowContent] = useState(true);
  const [showImages, setShowImages] = useState(true);

  // Load saved preferences from localStorage or defaults
  useEffect(() => {
    const savedShowContent = localStorage.getItem('showContent') === 'true';
    const savedShowImages = localStorage.getItem('showImages') === 'true';

    setShowContent(savedShowContent);
    setShowImages(savedShowImages);
  }, []);

  // Save preferences to localStorage
  const handleSavePreferences = () => {
    localStorage.setItem('showContent', showContent);
    localStorage.setItem('showImages', showImages);
    alert('Preferences saved successfully!');
  };

  return (
    <div className={`settings-page ${theme}`}>
      <h2>Customize Your Experience</h2>
      <div className="settings-section">
        <h3>Color Scheme</h3>
        <label>
          <input
            type="radio"
            name="colorScheme"
            value="light"
            checked={theme === 'light'}
            onChange={() => setTheme('light')}
          />
          Light
        </label>
        <label>
          <input
            type="radio"
            name="colorScheme"
            value="dark"
            checked={theme === 'dark'}
            onChange={() => setTheme('dark')}
          />
          Dark
        </label>
      </div>

      {/* <div className="settings-section">
        <h3>Home Feed Options</h3>
        <label>
          <input
            type="checkbox"
            checked={showContent}
            onChange={(e) => setShowContent(e.target.checked)}
          />
          Show Post Content
        </label>
        <label>
          <input
            type="checkbox"
            checked={showImages}
            onChange={(e) => setShowImages(e.target.checked)}
          />
          Show Post Images
        </label>
      </div> */}

      {/* <button className="save-button" onClick={handleSavePreferences}>
        Save Preferences
      </button> */}
    </div>
  );
};

export default SettingsPage;
