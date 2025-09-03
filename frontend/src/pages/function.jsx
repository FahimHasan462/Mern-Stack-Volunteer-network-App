import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// from admin dashboard volunteer list
export function Volunteerlist() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/admin-dashboard/volunteerlist");
      const data = await response.json();
      setVolunteers(data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  return (
    <div className="volunteer-table">
      <h3>Volunteer List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Skills</th>
            <th>Certifications</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((vol) => (
            <tr key={vol.v_id}>
              <td>{vol.v_id}</td>
              <td>{vol.volunteer_name}</td>
              <td>{vol.skills}</td>
              <td>{vol.certifications}</td>
              <td>{vol.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// edit profile

export function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch("http://localhost:3002/api/volunteer/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        const userData = Array.isArray(data) ? data[0] : data;
        setProfile(userData);
      })
      .catch((err) => console.error("Error:", err));
  }, [userId]);

  if (!profile) return <h2>Loading...</h2>;

  return (
    <div className="edit-profile-container">
      {/* Navbar */}
      <nav className="profile-navbar">
        <h2>Volunteer Dashboard</h2>
        <div  className="nav-actions">
          <button className="logout-btn"  onClick={() => navigate("/volunteer-dashboard")}>Home</button>
          <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
        </div>
      </nav>

      {/* Profile Form */}
      <div className="profile-card">
        <h2>Edit Profile</h2>
        <form>
          <FormRow label="Name" value={profile.name} />
          <FormRow label="Email" value={profile.email} />
          <FormRow label="Phone" value={profile.phone} />
          <FormRow label="Role" value={profile.role} />
          <FormRow label="Skills" value={profile.skills} />
          <FormRow label="Certifications" value={profile.certifications} />
          <FormRow label="Availability" value={profile.availability} />

          <button type="button" className="edit-btn">Edit</button>
        </form>
      </div>
    </div>
  );
}

// Form row component
function FormRow({ label, value }) {
  return (
    <div className="form-row">
      <label>{label}</label>
      <input type="text" value={value} readOnly />
    </div>
  );
}
