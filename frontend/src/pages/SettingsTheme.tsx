import { useState, useEffect } from 'react';
import { useUiStore } from '../stores/uiStore';
import apiClient from '../api/axios';

const SettingsTheme = () => {
  // Get setters and current values from the Zustand store
  const {
    menuPlacement,
    themeColor,
    bgImageUrl,
    setMenuPlacement,
    setThemeColor,
    setBgImageUrl,
  } = useUiStore();

  // Local component state to manage form inputs before they are set to the global store
  const [localThemeColor, setLocalThemeColor] = useState(themeColor);
  const [localBgImageUrl, setLocalBgImageUrl] = useState(bgImageUrl);
  const [message, setMessage] = useState('');

  // Update local state when global state changes (e.g., on initial load from localStorage)
  useEffect(() => {
    setLocalThemeColor(themeColor);
  }, [themeColor]);

  useEffect(() => {
    setLocalBgImageUrl(bgImageUrl);
  }, [bgImageUrl]);

  // Handle live preview by updating the global store on change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalThemeColor(e.target.value);
    setThemeColor(e.target.value); // Live preview
  };

  const handlePlacementChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMenuPlacement(e.target.value as 'top' | 'left' | 'right' | 'bottom'); // Live preview
  };

  const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalBgImageUrl(e.target.value);
    setBgImageUrl(e.target.value); // Live preview
  }

  const handleSave = async () => {
    setMessage('');
    try {
      // The store is already updated for live preview, just need to post to backend
      const prefsToSave = {
        themeColor: useUiStore.getState().themeColor,
        menuPlacement: useUiStore.getState().menuPlacement,
        bgImageUrl: useUiStore.getState().bgImageUrl,
      };
      const response = await apiClient.post('/user-prefs', prefsToSave);
      if (response.data.ok) {
        setMessage('Settings saved successfully!');
      } else {
        setMessage('Failed to save settings.');
      }
    } catch (error) {
      setMessage('An error occurred while saving settings.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Theme Settings</h1>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="menuPlacement" className="form-label">Menu Placement</label>
            <select
              id="menuPlacement"
              className="form-select"
              value={menuPlacement}
              onChange={handlePlacementChange}
            >
              <option value="top">Top</option>
              <option value="left">Left</option>
              <option value="right">Right (Not Implemented)</option>
              <option value="bottom">Bottom (Not Implemented)</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="themeColor" className="form-label">Accent Color</label>
            <input
              type="color"
              className="form-control form-control-color"
              id="themeColor"
              value={localThemeColor}
              onChange={handleColorChange}
              title="Choose your color"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bgImageUrl" className="form-label">Background Image URL</label>
            <input
              type="text"
              className="form-control"
              id="bgImageUrl"
              value={localBgImageUrl}
              onChange={handleBgImageChange}
              placeholder="Enter image URL"
            />
          </div>

          <button className="btn btn-primary" onClick={handleSave}>
            Save Settings
          </button>
          {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default SettingsTheme;
