import React, { useState } from "react";
import "../style/new_user.css"; 

export function NewUser () {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "help_seeker",
    password: "",
    skill: "",
    verification: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // send formData to backend here
  };

  return (
    <div className="reg-container">
      <form onSubmit={handleSubmit} className="reg-form">
        <h2 className="reg-heading">Register</h2>
        <div className="reg-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="reg-input"
          />
        </div>

        <div className="reg-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="reg-input"
          />
        </div>

        <div className="reg-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="reg-input"
          />
        </div>

        <div className="reg-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="reg-input"
          >
            <option value="help_seeker">Help Seeker</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {/* Conditionally render extra fields if volunteer */}
        {formData.role === "volunteer" && (
          <>
            <div className="reg-group">
              <label>Skill</label>
              <input
                type="text"
                name="skill"
                value={formData.skill}
                onChange={handleChange}
                placeholder="e.g. First Aid, Driving"
                className="reg-input"
              />
            </div>

            <div className="reg-group">
              <label>Verification</label>
              <input
                type="text"
                name="verification"
                value={formData.verification}
                onChange={handleChange}
                placeholder="e.g. ID number, certificate"
                className="reg-input"
              />
            </div>
          </>
        )}

        <div className="reg-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="reg-input"
          />
        </div>

        <button type="submit" className="reg-btn">
          Register
        </button>
      </form>
    </div>
  );
};


