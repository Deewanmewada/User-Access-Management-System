import React, { useState, useEffect } from "react";
import axios from "axios";

function RequestAccess() {
  const [softwareList, setSoftwareList] = useState([]);
  const [softwareId, setSoftwareId] = useState("");
  const [accessType, setAccessType] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/software", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSoftwareList(res.data);
      } catch (err) {
        console.error("Failed to fetch software list");
      }
    };
    fetchSoftware();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "/api/requests",
        { softwareId, accessType, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setSoftwareId("");
      setAccessType("");
      setReason("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div>
      <h2>Request Access</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Software:</label>
          <select value={softwareId} onChange={(e) => setSoftwareId(e.target.value)} required>
            <option value="">Select software</option>
            {softwareList.map((software) => (
              <option key={software.id} value={software.id}>
                {software.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Access Type:</label>
          <input value={accessType} onChange={(e) => setAccessType(e.target.value)} required />
        </div>
        <div>
          <label>Reason:</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default RequestAccess;
