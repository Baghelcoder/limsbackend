const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require("multer")
const { models } = require('../config/db');
const Client = models.Client;
const path = require("path");
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const UpdateLog = models.UpdateLog
const User = models.User

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage });
router.use('/public', express.static('public'));

router.post('/create-client', authenticateToken, upload.fields([{ name: 'NABLLogo' }, { name: 'Logo' }]), async(req, res) => {
    try {
        const {
            LaboratoryName,
            Address,
            City,
            State,
            Pin,
            Country,
            UserName,
            Password,
            PhoneNo,
            AlternatePhoneNo,
            Email,
            AlternateEmail,
            GSTNo,
            PanNo,
            RegistrationDate,
            NABLCertificateNo,
            Designation,
            NABLvalidityFrom,
            NABLvalidityTo,
            UserCreate,
            SubscriptionDuration,
            ContactPerson
        } = req.body;
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: 'You do not have permission to create an Client' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const existingUser = await User.findOne({ where: { username: UserName } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create a new user for the client
        const newUser = await User.create({
            username: UserName,
            password: hashedPassword,
            role: 'client',
            accessfor: 'null',
            Active: 'true',
            CanEdit: 'true',
            CanDelete: 'true',
            createdBy: req.user.id, // Assuming req.user.id is the admin creating the client
        });


        const NABLLogo = req.files['NABLLogo'] ? req.files['NABLLogo'][0].filename : null;
        const Logo = req.files['Logo'] ? req.files['Logo'][0].filename : null;
        if (!req.files) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const existingClient = await Client.findOne({ where: { LaboratoryName } });
        if (existingClient) {
            return res.status(400).json({ error: "Client already exists" });
        }

        // Create a new client
        const newClient = await Client.create({
            LaboratoryName,
            Address,
            City,
            State,
            Pin,
            Country,
            PhoneNo,
            AlternatePhoneNo,
            Email,
            AlternateEmail,
            GSTNo,
            PanNo,
            RegistrationDate,
            NABLCertificateNo,
            NABLLogo,
            Logo,
            Designation,
            NABLvalidityFrom,
            NABLvalidityTo,
            UserCreate,
            SubscriptionDuration,
            ContactPerson,
            UserId: newUser.id // Associate the client with the new user
        });

        res.status(200).json({ message: 'Client created successfully!', newClient });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error', upload })
    }
});

router.get('/clients', authenticateToken, async(req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: 'You do not have permission to see all Clients' });
        }
        const clients = await Client.findAll({
            include: [{
                model: User,
                as: 'Userschemadata',
                attributes: ['id', 'username', "Active"] // Include specific fields from the User model
            }],
            order: [
                ['RegistrationDate', 'DESC']
            ]
        })

        res.status(200).json(clients);
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/client-data-by-id/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role === 'client') {
            const clientdata = await Client.findOne({ where: { id } })
            return res.status(200).json(clientdata)
        } else if (req.user.role === 'admin') {
            const clientdata = await Client.findOne({
                where: { id },
                include: [{
                    model: User,
                    as: 'Userschemadata',
                    attributes: ['id', 'username']
                }]
            })
            return res.status(200).json(clientdata)
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

router.get('/client-data', authenticateToken, async(req, res) => {
    try {
        const client = await Client.findOne({
            where: { UserId: req.user.id },
            attributes: ["id", 'LaboratoryName', 'Logo'],
            include: [{ model: User, attributes: ['username'], as: 'Userschemadata', }]
        });

        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json({ client });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

//update client data

router.put('/update-client/:id', authenticateToken, upload.fields([{ name: 'NABLLogo' }, { name: 'Logo' }]), async(req, res) => {
    try {
        const { id } = req.params;
        const {
            LaboratoryName,
            Address,
            City,
            State,
            Pin,
            Country,
            PhoneNo,
            AlternatePhoneNo,
            Email,
            AlternateEmail,
            GSTNo,
            PanNo,
            RegistrationDate,
            NABLCertificateNo,
            Designation,
            NABLvalidityFrom,
            NABLvalidityTo,
            UserCreate,
            SubscriptionDuration,
            ContactPerson,
            username,
            password,
            UserId
        } = req.body;

        // Check if the user is the owner of the client or admin
        const client = await Client.findOne({ where: { id } });
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }
        if (req.user.role == 'admin') {
            const USER = await User.findOne({ where: { id: UserId } });
            if (!USER) {
                return res.status(500).json({ error: 'User not found' });
            }
            await USER.update({
                username,
                password
            })
        }


        // Track changes by comparing the existing client data with new data
        const changes = {};
        for (let key in req.body) {
            if (req.body[key] && req.body[key] !== client[key]) {
                changes[key] = {
                    old: client[key],
                    new: req.body[key]
                };
            }
        }

        // Handle file updates (NABLLogo and Logo)
        const NABLLogo = req.files['NABLLogo'] ? req.files['NABLLogo'][0].filename : client.NABLLogo;
        const Logo = req.files['Logo'] ? req.files['Logo'][0].filename : client.Logo;

        // Update the client data
        await client.update({
            LaboratoryName,
            Address,
            City,
            State,
            Pin,
            Country,
            PhoneNo,
            AlternatePhoneNo,
            Email,
            AlternateEmail,
            GSTNo,
            PanNo,
            RegistrationDate,
            NABLCertificateNo,
            NABLLogo,
            Logo,
            Designation,
            NABLvalidityFrom,
            NABLvalidityTo,
            UserCreate,
            SubscriptionDuration,
            ContactPerson
        });

        // Log the changes for admin
        if (Object.keys(changes).length > 0) {
            await UpdateLog.create({
                clientId: client.id,
                userId: req.user.id,
                changes: JSON.stringify(changes), // Save changes as a JSON string
                updatedAt: new Date()
            });
        }

        res.status(200).json({ message: 'Client updated successfully!', changes });

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/client-updates-logs/:id', authenticateToken, async(req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { id } = req.params;
        const logs = await UpdateLog.findAll({
            where: { clientId: id },
            include: [{
                model: Client,
                as: 'clientdata',
                attributes: ['LaboratoryName']
            }],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(logs);
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;