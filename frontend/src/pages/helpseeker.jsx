import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/v.css";

function HelpseekerDashboard() {
  const userId = localStorage.getItem("user_id");
  const [name, setname] = useState("");
  const [volunteers, setVolunteers] = useState([]);
  const [request, setRequest] = useState("");       // store input
  const [message, setMessage] = useState("");       // success message
  const navigate = useNavigate();

  // Fetch name in the navbar
  useEffect(() => {
    fetch("http://localhost:3002/api/volunteer-dashboard/navname", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((result) => setname(result[0].name))
      .catch((error) => console.error("Error:", error));
  }, [userId]);

  // Fetch volunteer skills & certifications on page load
  useEffect(() => {
    fetch("http://localhost:3002/api/volunteer-dashboard/volskill")
      .then((res) => res.json())
      .then((data) => setVolunteers(data))
      .catch((err) => console.error("Error fetching volunteers:", err));
  }, []);

  // Handle posting a help request
  const handlePost = () => {
    if (!request.trim()) {
      setMessage("Please enter your request");
      return;
    }

    fetch("http://localhost:3002/api/helpseeker/helppost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details: request }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);   // show success message
        setRequest("");             // clear input
      })
      .catch((err) => {
        console.error("Error posting request:", err);
        setMessage("Something went wrong");
      });
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="profile-navbar">
        <h1 className="logo">{name}</h1>
        <div className="nav-actions">
          <button className="logout-btn" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </nav>

      {/* Greeting */}
      <h1>How May We Help you today {name}</h1>

      {/* Flex container for input + table */}
      <div className="content-row">
        {/* Input Box */}
        <div className="input-box">
          <h2>Ask for help</h2>
          <input
            type="text"
            placeholder="Enter your need (e.g. medical, tutoring)"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
          <button type="button" onClick={handlePost}>
            Post
          </button>
          {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
        </div>

        {/* Volunteer Table */}
        <div className="table-container">
          <h2>Skill and certifications of our volunteers</h2>
          <table className="volunteer-table">
            <thead>
              <tr>
                <th>Skills</th>
                <th>Certification</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((vol, index) => (
                <tr key={index}>
                  <td>{vol.skills}</td>
                  <td>{vol.certifications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HelpseekerDashboard;
