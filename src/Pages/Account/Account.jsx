import React, { useState } from 'react';
import './Account.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data - in a real app this would come from your authentication system
  const user = {
    name: "Sarah Johnson",
    username: "eventpro_sarah",
    email: "sarah@eventexplorer.com",
    profilePicture: "/api/placeholder/150/150",
    eventsCreated: [
      { id: 1, title: "Tech Conference 2025", date: "May 15-17, 2025", status: "Published", attendees: 127 },
      { id: 2, title: "Local Art Exhibition", date: "June 10, 2025", status: "Published", attendees: 45 },
      { id: 3, title: "Music in the Park", date: "July 5, 2025", status: "Draft", attendees: 0 }
    ],
    eventDrafts: [
      { id: 4, title: "Startup Meetup", date: "August 12, 2025", lastEdited: "Yesterday" },
      { id: 5, title: "Community Workshop", date: "September 3, 2025", lastEdited: "3 days ago" }
    ]
  };

  return (
    <div className="account-content-container">
      {/* Tab Navigation */}
      <div className="content-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'myEvents' ? 'active' : ''}`}
          onClick={() => setActiveTab('myEvents')}
        >
          My Events
        </button>
        <button 
          className={`tab-button ${activeTab === 'drafts' ? 'active' : ''}`}
          onClick={() => setActiveTab('drafts')}
        >
          Drafts
        </button>
        <button 
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>
      
      {/* Content Area */}
      <div className="tab-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Profile Information</h2>
              <button className="edit-btn">Edit Profile</button>
            </div>
            
            <div className="profile-card">
              <div className="profile-image-large">
                <img src={user.profilePicture} alt="Profile" />
                <button className="change-photo-btn">Change Photo</button>
              </div>
              
              <div className="profile-details">
                <div className="detail-group">
                  <label>Display Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="detail-group">
                  <label>Username</label>
                  <p>@{user.username}</p>
                </div>
                <div className="detail-group">
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
                <div className="detail-group">
                  <label>Account Type</label>
                  <p>Event Organizer</p>
                </div>
                <div className="detail-group">
                  <label>Member Since</label>
                  <p>October 2024</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'myEvents' && (
          <div className="my-events-section">
            <div className="section-header">
              <h2>My Events</h2>
              <button className="primary-btn">Create New Event</button>
            </div>
            
            <div className="events-list">
              <table>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Attendees</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {user.eventsCreated.map(event => (
                    <tr key={event.id}>
                      <td>{event.title}</td>
                      <td>{event.date}</td>
                      <td>
                        <span className={`status-badge ${event.status.toLowerCase()}`}>
                          {event.status}
                        </span>
                      </td>
                      <td>{event.attendees}</td>
                      <td className="actions">
                        <button className="action-btn view">View</button>
                        <button className="action-btn edit">Edit</button>
                        <button className="action-btn delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="events-stats">
              <div className="stat-card">
                <span className="stat-number">{user.eventsCreated.length}</span>
                <span className="stat-label">Total Events</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">172</span>
                <span className="stat-label">Total Attendees</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">2</span>
                <span className="stat-label">Published</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">1</span>
                <span className="stat-label">Draft</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'drafts' && (
          <div className="drafts-section">
            <div className="section-header">
              <h2>Event Drafts</h2>
              <button className="primary-btn">Create New Draft</button>
            </div>
            
            <div className="drafts-list">
              {user.eventDrafts.map(draft => (
                <div key={draft.id} className="draft-card">
                  <div className="draft-info">
                    <h3>{draft.title}</h3>
                    <p>Planned Date: {draft.date}</p>
                    <p className="last-edited">Last edited: {draft.lastEdited}</p>
                  </div>
                  <div className="draft-actions">
                    <button className="action-btn edit">Continue Editing</button>
                    <button className="action-btn publish">Publish</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
              ))}
              
              {user.eventsCreated
                .filter(event => event.status === 'Draft')
                .map(draft => (
                  <div key={draft.id} className="draft-card">
                    <div className="draft-info">
                      <h3>{draft.title}</h3>
                      <p>Planned Date: {draft.date}</p>
                      <p className="last-edited">Last edited: 5 days ago</p>
                    </div>
                    <div className="draft-actions">
                      <button className="action-btn edit">Continue Editing</button>
                      <button className="action-btn publish">Publish</button>
                      <button className="action-btn delete">Delete</button>
                    </div>
                  </div>
                ))
              }
            </div>
            
            {user.eventDrafts.length === 0 && user.eventsCreated.filter(e => e.status === 'Draft').length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No Drafts Yet</h3>
                <p>Start creating your first event draft now!</p>
                <button className="primary-btn">Create New Draft</button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="security-section">
            <div className="section-header">
              <h2>Security Settings</h2>
            </div>
            
            <div className="security-card">
              <h3>Change Password</h3>
              <form className="password-form">
                <div className="form-group">
                  <label htmlFor="current-password">Current Password</label>
                  <input type="password" id="current-password" />
                </div>
                <div className="form-group">
                  <label htmlFor="new-password">New Password</label>
                  <input type="password" id="new-password" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm New Password</label>
                  <input type="password" id="confirm-password" />
                </div>
                <button type="submit" className="primary-btn">Update Password</button>
              </form>
            </div>
            
            <div className="security-card">
              <h3>Two-Factor Authentication</h3>
              <div className="two-factor-toggle">
                <p>Protect your account with an extra layer of security. When 2FA is enabled, you'll need to provide a code from your phone in addition to your password when signing in.</p>
                <div className="toggle-control">
                  <span>2FA is currently disabled</span>
                  <button className="primary-btn">Enable 2FA</button>
                </div>
              </div>
            </div>
            
            <div className="security-card">
              <h3>Login History</h3>
              <div className="login-history">
                <div className="login-item">
                  <div className="login-info">
                    <p className="device">Chrome on Windows</p>
                    <p className="login-time">Today, 9:45 AM</p>
                  </div>
                  <span className="current-device">Current Device</span>
                </div>
                <div className="login-item">
                  <div className="login-info">
                    <p className="device">Safari on iPhone</p>
                    <p className="login-time">Yesterday, 3:12 PM</p>
                  </div>
                </div>
                <div className="login-item">
                  <div className="login-info">
                    <p className="device">Firefox on Mac</p>
                    <p className="login-time">April 18, 2025, 10:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;