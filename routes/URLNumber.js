// routes/ulrNumber.js
const express = require('express');
const router = express.Router();
const { models } = require('../config/db');
const Sequence = models.Sequence
const sequelize = require('../config/db'); // Your Sequelize instance
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');

router.post('/store-running-number', authenticateToken, async(req, res) => {
    const { runningNumber, currentYear, locationId } = req.body;

    try {
        const record = await Sequence.findOne({
            where: {
                UserId: req.user.createdBy
            }
        });

        if (record) {
            // Update existing record
            record.year = currentYear;
            record.locationId = locationId;
            record.currentValue = runningNumber;
            await record.save();
        } else {
            // Create a new record if none exists
            await Sequence.create({
                UserId: req.user.createdBy,
                year: currentYear,
                locationId: locationId,
                currentValue: runningNumber
            });
        }
        res.status(200).json({ message: 'Running number stored successfully.' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/get-running-number", authenticateToken, async(req, res) => {
    try {

        const data = await Sequence.findOne({ where: { UserId: req.user.createdBy } })
        res.status(200).json(data)

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;