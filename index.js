const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { logError } = require('./routes/logError');
const app = express();
require("dotenv").config();
const port = process.env.db_port;
const allowedOrigins = ['https://main.d3iojks81ytumc.amplifyapp.com']; // Replace with your Netlify domain

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,POST,PUT,DELETE', // Allow methods as needed
  credentials: true, // If your API requires cookies or authorization headers
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require("./routes/authRoutes"));
app.use(require("./routes/adminRoutes"))
app.use(require("./routes/clientRoutes"));
app.use(require("./routes/Masters"))
app.use(require("./routes/assinepage"))
app.use(require("./routes/CustomerReOrder"))
app.use(require('./routes/TestDataSheetData'))
app.use(require("./routes/Reports"))
app.use(require("./routes/staffmaster"))
app.use(require('./routes/URLNumber'))
app.use(require("./routes/reportnotes"))
app.use(require("./routes/masterlistofrecord"))
app.use(require("./routes/Entrytemplate"))


// Logging middleware to debug incoming requests
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

app.use(async(err, req, res, next) => {
    // Log the error
    await logError(err.message, err.stack, { url: req.originalUrl, method: req.method });
    // Respond to the client
    res.status(500).json({ error: 'Something went wrong!' });
});

// const bcrypt = require('bcryptjs');

// const plainPassword = 'admin';
// const saltRounds = 10;

// bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
//     if (err) {
//         console.error('Error generating hash:', err);
//         return;
//     }
//     console.log(`Hashed password for "admin": ${hash}`);
// });

 // const mysql = require('mysql2/promise');

 // async function testConnection() {
 //     try {
 //         const connection = await mysql.createConnection({
 //             host: 'mysql-3ae69e4c-okayjaanu7m-fe08.d.aivencloud.com',
 //             port: 22219,
 //             user: 'avnadmin',
 //             password: 'AVNS_zLTpAhM-WpRXXdiHkfj',
 //             database: 'defaultdb',
 //             connectTimeout: 60000
 //         });
 //         console.log('Connected to the database!');
 //         connection.end();
 //     } catch (error) {
 //         console.error('Connection failed:', error);
 //     }
 // }

 // testConnection();

// Route to get all error logs
// $2a$10$f/vqXC9x.01eLc1PPG35u.AKc0Y8nMgocSWMJqM1g8CHKWIQYtOyO



app.listen(port, (req, res) => {
    try {
        console.log(`http://localhost:${port}`);
    } catch (e) {
        console.log(e);
    }
});
