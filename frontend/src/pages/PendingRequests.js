import React, { useState, useEffect } from "react";
import axios from "axios";

function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/api/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests");
      }
    };
    fetchRequests();
  }, [token]);

  const handleUpdate = async (id, status) => {
    setMessage("");
    try {
      const res = await axios.patch(
        `/api/requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status } : req))
      );
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {message && <p>{message}</p>}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>User</th>
            <th>Software</th>
            <th>Access Type</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.user.username}</td>
              <td>{req.software.name}</td>
              <td>{req.accessType}</td>
              <td>{req.reason}</td>
              <td>{req.status}</td>
              <td>
                {req.status === "Pending" && (
                  <>
                    <button onClick={() => handleUpdate(req.id, "Approved")}>Approve</button>
                    <button onClick={() => handleUpdate(req.id, "Rejected")}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingRequests;
