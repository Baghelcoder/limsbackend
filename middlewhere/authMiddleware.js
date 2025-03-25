const jwt = require('jsonwebtoken');
const { logError } = require('../routes/logError');
const { ErrorLog } = require('../schemas/ErrorLog');
require("dotenv").config();


const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")
    if (!token) {
        res.status(400).send({ error: "add valid token" })
    }
    try {
        const data = jwt.verify(token, process.env.secret_key);
        req.user = data;
        next();
    } catch (error) {
        logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        return res.status(401).json({ error: 'invalid token' });
    }
};

module.exports = authenticateToken