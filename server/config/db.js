const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Emergency response"
});

// Connect and log status
db.connect((err) => {
    if (err) {
        console.error("Database not connected:", err.message);
    } else {
        console.log("Database connected successfully!");
    }
});

module.exports = db;
