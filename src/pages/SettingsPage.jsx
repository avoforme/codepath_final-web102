import React, { useState, useEffect } from "react";
import "./SettingsPage.css"; // Add styles for this page

const SettingsPage = () => {
  // State for settings
  const [colorScheme, setColorScheme] = useState("light");
  const [showContent, setShowContent] = useState(true);
  const [showImages, setShowImages] = useState(true);

  // Load saved preferences from localStorage or defaults
  useEffect(() => {
    const savedColorScheme = localStorage.getItem("colorScheme");
    const savedShowContent = localStorage.getItem("showContent") === "true";
    const savedShowImages = localStorage.getItem("showImages") === "true";

    if (savedColorScheme) setColorScheme(savedColorScheme);
    setShowContent(savedShowContent);
    setShowImages(savedShowImages);
  }, []);

  // Save preferences to localStorage
  const handleSavePreferences = () => {
    localStorage.setItem("colorScheme", colorScheme);
    localStorage.setItem("showContent", showContent);
    localStorage.setItem("showImages", showImages);

    alert("Preferences saved successfully!");
  };

  return (
    <div className={`settings-page ${colorScheme}`}>
      <h2>Customize Your Experience</h2>
      <div className="settings-section">
        <h3>Color Scheme</h3>
        <label>
          <input
            type="radio"
            name="colorScheme"
            value="light"
            checked={colorScheme === "light"}
            onChange={(e) => setColorScheme(e.target.value)}
          />
          Light
        </label>
        <label>
          <input
            type="radio"
            name="colorScheme"
            value="dark"
            checked={colorScheme === "dark"}
            onChange={(e) => setColorScheme(e.target.value)}
          />
          Dark
        </label>
      </div>

      <div className="settings-section">
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
      </div>

      <button className="save-button" onClick={handleSavePreferences}>
        Save Preferences
      </button>
    </div>
  );
};

export default SettingsPage;
