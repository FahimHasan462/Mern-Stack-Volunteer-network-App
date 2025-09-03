import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/v.css";
import bannerImg from "../assets/volunteerbanner.jpeg";

function VolunteerDashboard() {
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [pendingAssignments, setpendingAssignments] = useState(0);
  const [completeAssignments, setcompleteAssignments] = useState(0);
  const totalassignemnt=pendingAssignments+completeAssignments
  const [name, setname] = useState([]);
//name in the navbar
useEffect(() => {
    fetch("http://localhost:3002/api/volunteer-dashboard/navname", {method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ userId })})
  .then(response => response.json())
  .then(result => { setname(result[0].name);   })
  .catch(error => {console.error("Error:", error);});
  }, [userId]);


//completed task
useEffect(() => {
    fetch("http://localhost:3002/api/volunteer/completedtask", {
       method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ userId })})
  .then(response => response.json())
  .then(result => { setcompleteAssignments(result[0].total_assignments);   })
  .catch(error => {console.error("Error:", error);});
  }, [userId]);


  // pending task
  useEffect(() => {
    fetch("http://localhost:3002/api/volunteer-dashboard/pendingtask")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setpendingAssignments(data[0].total_assignments);
        }
      })
      .catch((err) => console.error("Error fetching pending tasks:", err));
  }, []);

//task table
useEffect(() => {
    fetch("http://localhost:3002/api/volunteer-dashboard/assigntask", {
       method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ userId })})
  .then(response => response.json())
  .then(result => { setTasks(result)
    console.log(result)
  })
  .catch(error => {console.error("Error:", error);});
  }, [userId]);
 

  return (
    
    <div className="dashboard-container">      
      <div className="banner-image">
        <img src={bannerImg} alt="Volunteer Banner" />
      </div>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">{name}</h1>
        <div className="nav-actions">
          <span className="profile-text"  onClick={() => navigate("/volunteer-dashboard/editprofile")}>Profile</span>
          <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
        </div>
      </nav>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card"><h3>Total Tasks</h3><p>{totalassignemnt}</p></div>
        <div className="stat-card"><h3>Completed</h3><p>{completeAssignments}</p></div>
        <div className="stat-card"><h3>Pending</h3><p>{pendingAssignments}</p></div>
      </div>

      {/* Task Table */}
      <div className="task-section">
        <h2>My Assigned Tasks</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Details</th><th>Start Time</th> <th>End Time</th> <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={i}>
                <td><b>{t.notes} </b></td>
                <td><b>{t.start_time} </b> </td>
                <td><b>{t.end_time}</b></td>
                <td><b> {t.route_info} km </b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VolunteerDashboard;
