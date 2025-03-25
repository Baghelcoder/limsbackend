const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { models } = require('../config/db');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const { Op } = require('sequelize');
require("dotenv").config();
const moment = require('moment-timezone');
const router = express.Router();

router.get("/error-logs", authenticateToken, async(req, res) => {
    try {
        const errorLogs = await models.ErrorLog.findAll({
            order: [
                ['timestamp', 'DESC']
            ]
        }); // Assuming Sequelize is being used
        res.status(200).json(errorLogs);
    } catch (err) {
        console.error('Failed to retrieve error logs:', err);
        res.status(500).json({ message: "Failed to retrieve error logs" });
    }
});

router.post('/login', async(req, res) => {
    const { username, password, timezone } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    try {

        const user = await models.User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid Username' });
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const Status = await models.User.findOne({ where: { id: user.id, Active: 'false' } });
        if (Status) {
            return res.status(401).json({ error: 'Account is inactive' });
        }

        const clientIp = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0];

        // Create a login log entry
        await models.LoginLog.create({
            userId: user.id,
            ipAddress: clientIp,
            loginTime: new Date(),
            userTimezone: timezone // Store the user's timezone in the log
        });

        const Userid = user.id;
        const clientuser = user.createdBy;

        let client;

        if (Userid) {
            client = await models.Client.findOne({ where: { UserId: Userid } });
        }
        if (clientuser && !client) {
            client = await models.Client.findOne({ where: { UserId: clientuser } });
        }
        if (client) {
            const subscriptionEndDate = new Date(client.SubscriptionDuration);
            const today = new Date();
            if (today > new Date(subscriptionEndDate.setHours(0, 0, 0, 0))) {
                return res.status(403).json({ error: 'Subscription has expired' });
            }
        }

        // Generate and return a JWT token
        jwt.sign({ id: user.id, role: user.role, createdBy: user.createdBy, accessfor: user.accessfor }, process.env.secret_key, { expiresIn: '24h' }, (err, token) => {
            if (err) {
                console.error("Error signing JWT:", err);
                return res.status(500).json({ error: "Server Side Error" });
            }
            res.status(200).json({
                user: { id: user.id, role: user.role, createdBy: user.createdBy, accessfor: user.accessfor },
                status: true,
                message: "User Login Successful",
                authorization: token,
            });
        });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});
router.post('/new-admin', authenticateToken, async(req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const existingUser = await models.User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: "Admin already exists" });
        } else if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You do not have permission to create an admin' });
        }
        // Create a new user for the client
        const newUser = await models.User.create({
            username,
            password: hashedPassword,
            role: 'admin',
            createdBy: req.user.id // Assuming req.user.id is the admin creating the client
        });
        res.status(200).json({ message: 'Admin created successfully!' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
})



router.post('/Add-unit', authenticateToken, async(req, res) => {
    try {
        const { unit } = req.body;

        const existunit = await models.UnitMaster.findOne({ where: { unit } })
        if (existunit) {
            return res.status(400).json({ error: "Unit already exists" });
        }

        const createunit = await models.UnitMaster.create({
            unit,
            UserId: req.user.id
        })

        res.status(200).json({ message: 'Unit is Added' })


    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
router.get("/get-unit-by-user", authenticateToken, async(req, res) => {
    try {

        if (req.user.role === "admin") {
            const get = await models.UnitMaster.findAll({ where: { UserId: req.user.id } })
            res.status(200).json(get)
        } else if (req.user.role === 'client') {
            const get = await models.UnitMaster.findAll({
                where: {
                    [Op.or]: [
                        { UserId: req.user.id }, // First condition
                        { '$userrole.role$': 'admin' } // Second condition (using the alias 'userrole' for the associated User model)
                    ]
                },
                include: [{
                    model: models.User,
                    as: 'userrole',
                    attributes: ['role']
                }]
            })
            res.status(200).json(get)

        }


    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/get-unit', authenticateToken, async(req, res) => {
    try {
        const getunit = await models.UnitMaster.findAll({
            where: {
                [Op.or]: [
                    { UserId: req.user.createdBy }, // First condition
                    { '$userrole.role$': 'admin' } // Second condition (using the alias 'userrole' for the associated User model)
                ]
            },
            include: [{
                model: models.User,
                as: 'userrole',
                attributes: ['role']
            }]
        });

        res.status(200).json(getunit)

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post('/logout', authenticateToken, async(req, res) => {
    try {
        const userId = req.user.id;

        // Find the latest login log for this user that doesn't have a logoutTime
        const log = await models.LoginLog.findOne({
            where: {
                userId,
                logoutTime: {
                    [Op.is]: null
                }
            },
            order: [
                    ['loginTime', 'DESC']
                ] // Get the most recent login
        });

        if (log) {
            // Update the logout time
            log.logoutTime = new Date();
            await log.save();
        }

        res.status(200).json({ message: 'User logged out successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get-logs/:id', authenticateToken, async(req, res) => {
    try {
        const id = req.params.id;
        const userRole = req.user.role;

        let logs;

        // Admin role: access logs of all 'client' users
        if (userRole === 'admin') {

            logs = await models.LoginLog.findAll({
                where: { userId: id },
                include: [{
                    model: models.User,
                    as: 'userdata',
                    attributes: ['username']
                }],
                order: [
                    ['logoutTime', 'DESC']
                ]
            });
        }
        // Client role: access logs for users created by the client
        else if (userRole === 'client') {
            const clientUsers = await models.User.findAll({
                where: {
                    createdBy: userId // Fetch users created by the client
                },
                attributes: ['id'], // Only fetch the id for users
            });

            const clientUserIds = clientUsers.map(user => user.id);

            logs = await models.LoginLog.findAll({
                where: {
                    userId: {
                        [Op.in]: clientUserIds
                    }
                }
            });
        }
        // Default: regular users, fetch only their own logs
        else {
            logs = await models.LoginLog.findAll({ where: { userId } });
        }

        // Convert loginTime and logoutTime to the user's local timezone
        const logsWithLocalTime = logs.map(log => {
            const loginTime = log.dataValues.loginTime; // Accessing dataValues
            const logoutTime = log.dataValues.logoutTime; // Accessing dataValues
            const userTimezone = log.dataValues.userTimezone; // Accessing user timezone

            // Check if loginTime is defined before using moment
            const loginTimeInUserTZ = loginTime ? moment(loginTime).tz(userTimezone).format('YYYY-MM-DD HH:mm:ss') : null;
            const logoutTimeInUserTZ = logoutTime ? moment(logoutTime).tz(userTimezone).format('YYYY-MM-DD HH:mm:ss') : null;

            return {
                ...log.toJSON(),
                loginTime: loginTimeInUserTZ,
                logoutTime: logoutTimeInUserTZ
            };
        });

        res.status(200).json(logsWithLocalTime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;