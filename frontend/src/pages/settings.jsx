import { h } from 'preact';
import { useState } from 'preact/hooks'; // If you need state for settings

function SettingsPage() {

    const [theme, setTheme] = useState('light');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
        // Save theme preference (e.g., to local storage)
    };

  const handleNotificationsChange = (event) => {
        setNotificationsEnabled(event.target.checked);
    // Save notification preference
  };

  return (
    <>
        <h1>Settings</h1>
        <div className='container'>
            <div>
                <label htmlFor="theme">Theme:</label>
                <select id="theme" value={theme} onChange={handleThemeChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div>
                <label>
                Enable Notifications:
                <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={handleNotificationsChange}
                />
                </label>
            </div>
        </div> 
    </>
  );
}

export default SettingsPage;