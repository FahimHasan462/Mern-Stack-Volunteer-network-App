import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/login.css';



function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user_id", data.user_id);
        // Redirect based on role
        if (data.role === "admin") navigate("/admin-dashboard");
        else if (data.role === "volunteer") navigate("/volunteer-dashboard");
        else if (data.role === "help_seeker") navigate("/helpseeker-dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  
  return (
     <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
        <span className="profile-text"  onClick={() => navigate("/newuser")}>Join Us </span>
      </div>
     </div> 
    );
}

export default LoginPage;
