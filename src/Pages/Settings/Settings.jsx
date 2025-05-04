import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('notifications');

  // Mock user settings data - would be fetched from your API in a real app
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      eventReminders: true,
      marketingEmails: false,
      newEventAlerts: true
    },
    privacy: {
      profileVisibility: 'public',
      showAttendedEvents: true,
      allowMessageRequests: true
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      reduceAnimations: false
    },
    integrations: {
      googleCalendar: true,
      facebook: false,
      slack: false
    }
  });

  // Handlers for different setting types
  const handleToggleChange = (section, setting) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [setting]: !settings[section][setting]
      }
    });
  };

  const handleSelectChange = (section, setting, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [setting]: value
      }
    });
  };

  // Save settings function (would connect to your API)
  const saveSettings = () => {
    // Show save confirmation
    alert('Settings saved successfully!');
    // In a real app, you would send the settings to your backend API
    console.log('Saving settings:', settings);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your preferences and account settings</p>
      </div>

      <div className="settings-content">
        <div className="settings-nav">
          <button 
            className={activeSection === 'notifications' ? 'active' : ''} 
            onClick={() => setActiveSection('notifications')}
          >
            Notifications
          </button>
          <button 
            className={activeSection === 'privacy' ? 'active' : ''} 
            onClick={() => setActiveSection('privacy')}
          >
            Privacy
          </button>
          <button 
            className={activeSection === 'appearance' ? 'active' : ''} 
            onClick={() => setActiveSection('appearance')}
          >
            Appearance
          </button>
          <button 
            className={activeSection === 'integrations' ? 'active' : ''} 
            onClick={() => setActiveSection('integrations')}
          >
            Integrations
          </button>
        </div>

        <div className="settings-panel">
          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <p className="section-desc">Control how and when we contact you</p>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Email Notifications</h3>
                  <p>Receive emails about your events and account activity</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.emailNotifications}
                    onChange={() => handleToggleChange('notifications', 'emailNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Event Reminders</h3>
                  <p>Receive reminders before events you're attending</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.eventReminders}
                    onChange={() => handleToggleChange('notifications', 'eventReminders')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Marketing Emails</h3>
                  <p>Receive updates about new features and promotions</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.marketingEmails}
                    onChange={() => handleToggleChange('notifications', 'marketingEmails')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>New Event Alerts</h3>
                  <p>Get notified about new events that match your interests</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.newEventAlerts}
                    onChange={() => handleToggleChange('notifications', 'newEventAlerts')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>
              <p className="section-desc">Control your profile visibility and data sharing preferences</p>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Profile Visibility</h3>
                  <p>Choose who can see your profile information</p>
                </div>
                <select 
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => handleSelectChange('privacy', 'profileVisibility', e.target.value)}
                  className="select-input"
                >
                  <option value="public">Public (Everyone)</option>
                  <option value="registeredUsers">Registered Users Only</option>
                  <option value="private">Private (Only You)</option>
                </select>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Show Attended Events</h3>
                  <p>Allow others to see events you've attended or registered for</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.privacy.showAttendedEvents}
                    onChange={() => handleToggleChange('privacy', 'showAttendedEvents')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Allow Message Requests</h3>
                  <p>Receive messages from other users about your events</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.privacy.allowMessageRequests}
                    onChange={() => handleToggleChange('privacy', 'allowMessageRequests')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance</h2>
              <p className="section-desc">Customize how Event Explorer looks for you</p>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Theme</h3>
                  <p>Choose between light and dark mode</p>
                </div>
                <div className="theme-selector">
                  <label className={`theme-option ${settings.appearance.theme === 'light' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="theme" 
                      value="light"
                      checked={settings.appearance.theme === 'light'}
                      onChange={() => handleSelectChange('appearance', 'theme', 'light')}
                    />
                    <span className="theme-check"></span>
                    Light
                  </label>
                  <label className={`theme-option ${settings.appearance.theme === 'dark' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="theme" 
                      value="dark"
                      checked={settings.appearance.theme === 'dark'}
                      onChange={() => handleSelectChange('appearance', 'theme', 'dark')}
                    />
                    <span className="theme-check"></span>
                    Dark
                  </label>
                </div>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Font Size</h3>
                  <p>Adjust text size for better readability</p>
                </div>
                <select 
                  value={settings.appearance.fontSize}
                  onChange={(e) => handleSelectChange('appearance', 'fontSize', e.target.value)}
                  className="select-input"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Reduce Animations</h3>
                  <p>Turn off or reduce visual animations and transitions</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.appearance.reduceAnimations}
                    onChange={() => handleToggleChange('appearance', 'reduceAnimations')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="settings-section">
              <h2>Integrations</h2>
              <p className="section-desc">Connect to third-party services and apps</p>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Google Calendar</h3>
                  <p>Sync your events with Google Calendar</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.integrations.googleCalendar}
                    onChange={() => handleToggleChange('integrations', 'googleCalendar')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Facebook</h3>
                  <p>Connect your Facebook account to share events</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.integrations.facebook}
                    onChange={() => handleToggleChange('integrations', 'facebook')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Slack</h3>
                  <p>Connect to Slack to receive event notifications</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.integrations.slack}
                    onChange={() => handleToggleChange('integrations', 'slack')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="connect-more">
                <button className="secondary-btn">Find More Integrations</button>
              </div>
            </div>
          )}

          <div className="settings-actions">
            <button className="save-btn" onClick={saveSettings}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;