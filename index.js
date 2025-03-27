const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { logError } = require('./routes/logError');
const path = require('path');
require("dotenv").config();
const app = express();
const port = process.env.db_port;

// Load SSL Certificate
const options = {
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('certificate.pem')
};


// Middleware setup
app.use(helmet());
// Customize Content-Security-Policy
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https://localhost:3001"], // Allow images from the backend
        },
    })
);
app.use(compression());
// app.use(cors());
app.use(cors({
    origin: "https://localhost:3000", // Allow frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
    optionsSuccessStatus: 200,
}));
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
// Serve static files (including images) from the public folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(limiter);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const routes = [
    "authRoutes", "adminRoutes", "clientRoutes", "Masters",
    "assinepage", "CustomerReOrder", "TestDataSheetData",
    "Reports", "staffmaster", "URLNumber", "reportnotes",
    "masterlistofrecord", "Entrytemplate"
];

routes.forEach(route => {
    app.use(require(`./routes/${route}`));
});


// Logging middleware to debug incoming requests
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

app.use(async(err, req, res, next) => {
    // Log the error
    await logError(err.message, err.stack, { url: req.originalUrl, method: req.method });
    // Prevent duplicate response
    if (res.headersSent) {
        return next(err);
    }

    // Respond to the client
    res.status(500).json({ error: 'Something went wrong!' });
});

app.get("/", (req, res) => {
    res.send('hello yogesh')
})

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

// Route to get all error logs
// $2a$10$f/vqXC9x.01eLc1PPG35u.AKc0Y8nMgocSWMJqM1g8CHKWIQYtOyO

// Start HTTPS Server
// Start Server
if (options) {
    https.createServer(options, app).listen(port, () => {
        console.log(`🔐 HTTPS Server running on port ${port}`);
    });

    http.createServer((req, res) => {
        res.writeHead(301, { "Location": `https://${req.headers['host']}${req.url}` });
        res.end();
    }).listen(8080, () => {
        console.log(`🚀 HTTP requests on port 80 will be redirected to HTTPS`);
    });
} else {
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port} (HTTP only)`);
    });
}