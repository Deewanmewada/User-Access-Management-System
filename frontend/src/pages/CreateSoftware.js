import React, { useState } from "react";
import axios from "axios";

function CreateSoftware() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevels, setAccessLevels] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "/api/software",
        {
          name,
          description,
          accessLevels: accessLevels.split(",").map((level) => level.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
      setName("");
      setDescription("");
      setAccessLevels("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div>
      <h2>Create Software</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Access Levels (comma separated):</label>
          <input value={accessLevels} onChange={(e) => setAccessLevels(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateSoftware;
