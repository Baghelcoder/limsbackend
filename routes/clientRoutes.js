const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require("multer")
const { models } = require('../config/db');
const User = models.User
const authenticateToken = require('../middlewhere/authMiddleware');
const ClientUser = models.ClientUser
const Client = models.Client
const { logError } = require('./logError');
const path = require("path");
const { Op } = require('sequelize');
const CustomerRegistration = models.CustomerRegistration
const CustomerOrder = models.CustomerOrder
const LabJob = models.LabJob
const Oldreport = models.Oldreport

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/profileimg")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage });
router.use('/public', express.static('public'));

router.post('/create-user', authenticateToken, upload.single('profileimage'), async(req, res) => {
    try {
        const { username, password, name, phoneno, dateofjoin, accessfor, address, city, state, pin, country, email, qualification } = req.body;
        const client = await Client.findOne({
            where: { UserId: req.user.id }
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const userCount = await User.count({
            where: { createdBy: req.user.id }
        });
        // Check if the user count exceeds the allowed number
        if (userCount >= client.UserCreate) {
            return res.status(403).json({ error: `Your User creation limit is ${client.UserCreate} ` });
        }
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // Conditionally set CanEdit and CanDelete based on accessfor
        const canEdit = accessfor === 'All' ? 'true' : 'false';
        const canDelete = accessfor === 'All' ? 'true' : 'false';
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role: 'user',
            accessfor,
            Active: 'true',
            CanEdit: canEdit,
            CanDelete: canDelete,
            createdBy: req.user.id
        });

        const profileimage = req.file ? req.file.path : null;
        await ClientUser.create({
            name,
            phoneno,
            dateofjoin,
            address,
            city,
            state,
            pin,
            country,
            email,
            qualification,
            profileimage,
            UserId: newUser.id
        })
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});
router.put('/update-user/:id', authenticateToken, upload.single('profileimage'), async(req, res) => {
    try {
        const userId = req.params.id;
        const { username, password, name, phoneno, dateofjoin, accessfor, address, city, state, pin, country, email, qualification } = req.body;
        const profileimage = req.file ? req.file.path : null;

        // Find the user to update
        const userToUpdate = await User.findByPk(userId, {
            include: [{ model: ClientUser, as: 'ClientUser' }]
        });

        if (!userToUpdate) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.user.role === 'client') {
            // If role is 'client', allow updates in both User and ClientUser
            if (username) {
                const existingUser = await User.findOne({
                    where: {
                        username,
                        id: {
                            [Op.ne]: userId
                        }
                    }
                });
                if (existingUser) {
                    return res.status(400).json({ error: 'Username already exists' });
                }
                userToUpdate.username = username;
            }

            if (password) {
                userToUpdate.password = await bcrypt.hash(password, 10);
            }

            if (accessfor) {
                userToUpdate.accessfor = accessfor;
                userToUpdate.CanEdit = accessfor === 'All' ? 'true' : 'false';
                userToUpdate.CanDelete = accessfor === 'All' ? 'true' : 'false';
            }

            await userToUpdate.save();
        }

        if (req.user.role === 'user' || req.user.role === 'client') {
            // If role is 'user' or 'client', allow updates in ClientUser only
            const clientUserToUpdate = userToUpdate.ClientUser[0];

            if (clientUserToUpdate) {
                if (name) clientUserToUpdate.name = name;
                if (phoneno) clientUserToUpdate.phoneno = phoneno;
                if (dateofjoin) clientUserToUpdate.dateofjoin = dateofjoin;
                if (address) clientUserToUpdate.address = address;
                if (city) clientUserToUpdate.city = city;
                if (state) clientUserToUpdate.state = state;
                if (pin) clientUserToUpdate.pin = pin;
                if (country) clientUserToUpdate.country = country;
                if (email) clientUserToUpdate.email = email;
                if (qualification) clientUserToUpdate.qualification = qualification;
                if (profileimage) clientUserToUpdate.profileimage = profileimage;

                await clientUserToUpdate.save();
            }
        } else {
            return res.status(403).json({ error: 'Unauthorized to update this data' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get("/all-client-user", authenticateToken, async(req, res) => {
    try {
        // Fetch users created by the authenticated user
        const users = await User.findAll({
            where: { createdBy: req.user.id },
            attributes: ['id', 'username', 'Active', 'CanEdit', 'CanDelete', 'accessfor'],
            include: [{
                model: ClientUser,
                as: 'ClientUser'
            }]
        });
        // Respond with the fetched users and client users
        return res.status(200).json(users);

    } catch (error) {
        await logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update user field API
router.put('/update-user-field', authenticateToken, async(req, res) => {
    const { id, field, value } = req.body;
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the specific field
        user[field] = value ? 'true' : 'false';
        await user.save();

        res.status(200).json({ message: 'Field updated successfully' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});



router.get('/clientuser-data', authenticateToken, async(req, res) => {
    try {
        const client = await User.findOne({
            where: { id: req.user.id },
            attributes: ['username', 'role', 'id', 'createdBy', 'accessfor', 'CanDelete', 'Active'],
            include: [{
                model: ClientUser,
                as: 'ClientUser',
            }]
        });
        const clientdata = await Client.findOne({ where: { UserId: req.user.createdBy }, attributes: ['Logo', 'LaboratoryName'] })
        if (!client) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ client, clientdata });
    } catch (error) {
        await logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/user-data-Analyze', authenticateToken, async(req, res) => {
    try {
        const { accessfor, year, UserId } = req.query;

        if (!year || isNaN(year)) {
            return res.status(400).json({ error: 'Invalid or missing year parameter' });
        }

        // Define start and end of the year
        const startOfYear = new Date(`${year}-01-01T00:00:00Z`);
        const endOfYear = new Date(`${parseInt(year) + 1}-01-01T00:00:00Z`);

        // Initialize variables for conditional data retrieval
        let customerdata = [];
        let orderdata = [];
        let testdata = [];
        let reportdata = [];

        // Retrieve data based on accessfor value
        if (accessfor === 'All' || accessfor === 'Registration') {
            customerdata = await CustomerRegistration.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: startOfYear,
                        [Op.lt]: endOfYear
                    },
                    UserId
                },
                attributes: ['createdAt']
            });

            orderdata = await CustomerOrder.findAll({
                where: {
                    DOROO: {
                        [Op.gte]: startOfYear,
                        [Op.lt]: endOfYear
                    },
                    UserId
                },
                attributes: ['DOROO']
            });
        }

        if (accessfor === 'All' || accessfor === 'DataEntry') {
            testdata = await LabJob.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: startOfYear,
                        [Op.lt]: endOfYear
                    },
                    UserId,
                    isTestfilled: 'true'
                },
                attributes: ['createdAt']
            });

            reportdata = await Oldreport.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: startOfYear,
                        [Op.lt]: endOfYear
                    },
                    UserId
                },
                attributes: ['createdAt']
            });
        }

        // Combine the results in a response object
        const response = { customerdata, orderdata, testdata, reportdata };
        // Send the filtered data
        res.status(200).json(response);

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router;