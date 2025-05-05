import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewPage = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests', err);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/requests/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRequests();
    } catch (err) {
      console.error(`Failed to ${action} request`, err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container" style={{ maxWidth: "100%" }}>
      <h2>Review Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>Filename</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.name}</td>
              <td>{req.path}</td>
              <td>{req.filename}</td>
              <td>{req.description}</td>
              <td>{req.status}</td>
              <td>
                <button onClick={() => handleAction(req.id, 'approve')}>Approve</button>
                <button onClick={() => handleAction(req.id, 'deny')} style={{ marginTop: '5px' }}>Deny</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewPage;
