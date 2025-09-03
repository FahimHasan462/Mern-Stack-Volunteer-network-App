import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/admin.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [pendingTasks, setPendingTasks] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
//log out button
  const handleLogout = () => {
    navigate("/"); // back to login page
  };

//verify button

const handleVerifyNews = (content) => {
  fetch("http://localhost:3002/api/admin-dashboard/news/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
      // Remove from state
      setNewsList(newsList.filter(news => news.content !== content));
      // Optionally, refresh pendingTasks table
      fetch("http://localhost:3002/api/admin-dashboard/pending_task")
        .then(res => res.json())
        .then(data => setPendingTasks(data));
    })
    .catch(err => console.error("Error verifying news:", err));
};


//delete news buttom

const handleDeleteNews = (source, content) => {
  fetch("http://localhost:3002/api/admin-dashboard/newsdelete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, content }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete news");
      setNewsList(newsList.filter(
        (news) => news.source !== source || news.content !== content
      ));
    })
    .catch((err) => console.error("Error deleting news:", err));
};

  // Fetch pending tasks
  useEffect(() => {
    fetch("http://localhost:3002/api/admin-dashboard/pending_task")
      .then((res) => res.json())
      .then((data) => setPendingTasks(data))
      .catch((err) => console.error("Error fetching pending tasks:", err));
  }, []);

  // Fetch news verification data
  useEffect(() => {
    fetch("http://localhost:3002/api/admin-dashboard/newsverify")
      .then((res) => res.json())
      .then((data) => setNewsList(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  // Fetch assigned tasks
  useEffect(() => {
    fetch("http://localhost:3002/api/admin-dashboard/assigntable")
      .then((res) => res.json())
      .then((data) => setAssignedTasks(data))
      .catch((err) => console.error("Error fetching assigned tasks:", err));
  }, []);

  // Show only 3 pending tasks at a time
  const displayedPendingTasks = pendingTasks.slice(0, 3);

  return (
    <div className="admin-dashboard">
      {/* Navigation bar */}
      <nav className="navbar">
        <h2>Admin Dashboard</h2>
        <div className="nav-buttons">
          <button
            className="volunteer-btn"
            onClick={() => navigate("/admin-dashboard/volunteerlist")}
          >
            Volunteer List
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="bottom-container">
        {/* News Verification Table */}
        <div className="table-wrapper news-verification">
          <h3>News Verification</h3>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsList.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No news found
                  </td>
                </tr>
              ) : (
                newsList.slice(0, 3).map((news, index) => (
                  <tr key={index}>
                    <td>{news.source}</td>
                    <td>{news.content}</td>
                    <td>
                      <button className="verify-btn"  onClick={() => handleVerifyNews(news.content)} >Verify</button>
                      <button className="delete-btn"  onClick={() => handleDeleteNews(news.source, news.content)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Info Card */}
        <div className="info-card">
          <div className="info-item">
            Pending Assignments: <strong>{pendingTasks.length}</strong>
          </div>
          <div className="info-item">
            Assigned Volunteers: <strong>{assignedTasks.length}</strong>
          </div>
          <div className="info-item">Free Volunteers: <strong>8</strong></div>
          <div className="info-item">
            News Verifications Pending: <strong>{newsList.length}</strong>
          </div>
          <div className="info-item">
            Pending Assigned Task: <strong>{newsList.length}</strong>
          </div>
        </div>
      </div>

      <div className="tables-container">
        {/* Pending Assignments */}
        <div className="table-wrapper">
          <h3>Pending Assignments</h3>
          <table>
            <thead>
              <tr>
                <th>Assignment Details</th>
                <th>Start Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedPendingTasks.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No pending tasks
                  </td>
                </tr>) : 
                (
                displayedPendingTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.details}</td>
                    <td>
                      {new Date(task.datetime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <button className="assign-btn">Assign</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Assigned Tasks */}
        <div className="table-wrapper">
          <h3>Assigned Tasks</h3>
          <table>
            <thead>
              <tr>
                <th>Assignment Details</th>
                <th>Volunteer</th>
              </tr>
            </thead>
            <tbody>
              {assignedTasks.length === 0 ? (
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    No assigned tasks
                  </td>
                </tr>
              ) : (
                assignedTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.notes}</td>
                    <td>{task.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed Assignments Table */}
      <div className="table-wrapper">
        <h3>Completed Assignments</h3>
        <table>
          <thead>
            <tr>
              <th>Assignment Details</th>
              <th>Feedback</th>
              <th>Date/Time</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Food Distribution</td>
              <td>Good</td>
              <td>2025-08-28 10:00</td>
              <td>John Doe</td>
            </tr>
            <tr>
              <td>Medical Camp Setup</td>
              <td>Excellent</td>
              <td>2025-08-28 14:00</td>
              <td>Sarah Khan</td>
            </tr>
            <tr>
              <td>Community Awareness</td>
              <td>Satisfactory</td>
              <td>2025-08-27 11:00</td>
              <td>Ali Rahman</td>
            </tr>
            <tr>
              <td>Relief Material Packing</td>
              <td>Good</td>
              <td>2025-08-26 09:00</td>
              <td>Jane Smith</td>
            </tr>
            <tr>
              <td>Clothes Distribution</td>
              <td>Excellent</td>
              <td>2025-08-25 15:00</td>
              <td>David Lee</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
