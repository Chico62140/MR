import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/requests`);
    setRequests(res.data);
  };

  const handleAction = async (id, action) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/requests/${id}/${action}`);
      fetchRequests(); // Refresh
    } catch (err) {
      console.error(`${action} failed`, err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="main-heading">Review Requests</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", backgroundColor: "#fff" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>File/Folder</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.name}</td>
              <td>{req.path}</td>
              <td>{req.filename}</td>
              <td>{req.description}</td>
              <td>{req.status}</td>
              <td>
                <button onClick={() => handleAction(req.id, "approve")} className="btn">
                  <span>Approve</span>
                </button>
                <button onClick={() => handleAction(req.id, "deny")} className="btn btn-outline">
                  <span>Deny</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
