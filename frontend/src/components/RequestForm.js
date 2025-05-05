import React, { useState } from 'react';
import axios from 'axios';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    filename: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/requests`, formData);
      setMessage('✅ Request submitted successfully.');
      setFormData({ name: '', path: '', filename: '', description: '' });
    } catch (err) {
      console.error('Error submitting request', err);
      setMessage('❌ Error submitting request');
    }
  };

  return (
    <div className="container">
      <h2>Submit File/Folder Access Request</h2>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input name="path" placeholder="Disconnected Path (e.g., P:/Shared/Docs)" value={formData.path} onChange={handleChange} required />
        <input name="filename" placeholder="File or Folder Name" value={formData.filename} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" rows="4" value={formData.description} onChange={handleChange} required />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestForm;
