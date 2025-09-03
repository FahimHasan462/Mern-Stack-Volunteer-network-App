const db = require("../config/db");

exports.getVolunteerlist = (req, res) => {
    db.query('SELECT v.v_id, u.name AS volunteer_name, v.skills, v.certifications, v.availability FROM volunteer v JOIN user u ON v.v_id = u.user_id', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
};
exports.getPendingTask =  (req, res) => {
    db.query('SELECT details, datetime FROM pending_assignment', (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

exports.newstable =  (req, res) => {
    db.query('SELECT source,content FROM  news ', (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

exports.assigntable =  (req, res) => {
    db.query('SELECT a.notes, u.name  FROM assignments a  JOIN volunteer v ON a.v_id = v.v_id JOIN user u ON v.v_id = u.user_id  ', (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).send(err);
        }
        res.json(result);
    });
};
//delete news from table (delete button)
exports.deleteNews = (req, res) => {
    const { source, content } = req.body;
    const sql = "DELETE FROM news WHERE source = ? AND content = ?";
    db.query(sql, [source, content], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No news found to delete" });
        }
        res.json({ message: "News deleted successfully" });
    });
};

//posting verfied news to pending assigment and deleting from news(verfy button)

exports.verifyNews = (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }
    //adding to pending assignment
    const insertSql = "INSERT INTO pending_assignment (details, datetime) VALUES (?, ?)";
    db.query(insertSql, [content,null], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to add pending assignment" });
        }

    //Deleteing from news 
        const deleteSql = "DELETE FROM news WHERE content = ?";
        db.query(deleteSql, [content], (err2, result2) => {
            if (err2) {
                console.error(err2);
                return res.status(500).json({ error: "Failed to delete news" });
            }
            res.json({ message: "News verified and added to pending assignments successfully" });
        });
    });
};
//assign button




//log in 
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",[email, password],(err, results) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (results.length > 0) {
        const user = results[0];
        res.json({ success: true, role: user.role, user_id :user.user_id });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }
  );
};
// volunteer profile
exports.profileinfo =(req, res) => {
    const { userId } = req.body; 

  db.query(
    "SELECT u.user_id, u.name, u.email, u.phone, u.role, v.skills, v.certifications, v.availability FROM user u JOIN volunteer v ON u.user_id = v.v_id WHERE u.user_id = ?",[userId],(err, results) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (results.length > 0) {
         res.json(results)
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }
  );
};
//total number of pending task
exports.totalpending =(req, res) => {
    db.query('SELECT COUNT(*) AS total_assignments FROM pending_assignment', (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

//total number of completed task
exports.totalcompletedtask= (req, res) => {
    const { userId } = req.body; 

  db.query(
    " SELECT COUNT(*) AS total_assignments FROM assignments where v_id= ?",[userId],(err, results) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (results.length > 0) {
         res.json(results)
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }
  );
}
//assigned task to volunteer
exports.assignedtask = (req, res) => {
  const { userId } = req.body; 

  db.query(
    "SELECT notes,start_time,end_time , route_info FROM assignments WHERE v_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Server error" });

      // Return empty array if no assignments found
      res.json(results); 
    }
  );
}

//get navbar name
exports.navname=  (req, res) => {
  const { userId } = req.body; 

  db.query(
    "SELECT name FROM user WHERE user_id = ?",[userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Server error" });

      // Return empty array if no assignments found
      res.json(results); 
    }
  );
}

exports.volskill =  (req, res) => {
    db.query('SELECT skills, certifications  FROM  volunteer', (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).send(err);
        }
        res.json(result);
    });
}

exports.helppost = (req, res) => {
  const { details } = req.body; 

  // Make sure details is provided
  if (!details) {
    return res.status(400).json({ error: "Details are required" });
  }

  // Use ? placeholder to prevent SQL injection
  const sql = "INSERT INTO pending_assignment (Details, DateTime) VALUES (?, NOW())";

  db.query(sql, [details], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
    // Send success message
    res.json({ message: "Your request has been submitted" });
  });
};




