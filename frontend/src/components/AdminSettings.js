import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    drive_mappings: {},
    group_destinations: {},
    email_info: {},
    ldap: {}
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${process.env.REACT_APP_API_URL}/admin/settings`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setSettings(res.data))
    .catch((err) => console.error('Error loading settings', err));
  }, []);

  const handleChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  const handleAddField = (section) => {
    const newKey = prompt(`Add new key to ${section}`);
    if (newKey) {
      setSettings((prev) => ({
        ...prev,
        [section]: { ...prev[section], [newKey]: '' }
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/admin/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Settings saved!');
    } catch (err) {
      console.error('Failed to save settings', err);
      setMessage('❌ Failed to save settings');
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Settings</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={onSubmit}>
        {['drive_mappings', 'group_destinations', 'email_info', 'ldap'].map((section) => (
          <div key={section}>
            <h4>{section.replace('_', ' ').toUpperCase()}</h4>
            {Object.entries(settings[section] || {}).map(([k, v]) => (
              <input
                key={k}
                placeholder={k}
                value={v}
                onChange={(e) => handleChange(section, k, e.target.value)}
              />
            ))}
            <button type="button" onClick={() => handleAddField(section)}>
              ➕ Add to {section}
            </button>
          </div>
        ))}
        <button type="submit" className="save-btn">💾 Save Settings</button>
      </form>
    </div>
  );
};

export default AdminSettings;
