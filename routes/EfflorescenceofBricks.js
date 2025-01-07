const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const EfflorescenceofBricks = require('../schemas/EfflorescenceofBricks');
const { TestofLabJob } = require('../schemas/LabJobNo');
const router = express.Router();

router.post("/Efflorescence-of-Bricks", authenticateToken, async(req, res) => {
    try {
        const {
            labjobid,
            testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            RoomTemperature,
            BrickMark,
            Efflorescence
        } = req.body

        const data = await EfflorescenceofBricks.create({
            labJobId: req.body.labjobid,
            testId: req.body.testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            RoomTemperature,
            BrickMark,
            Efflorescence,
            UserId: req.user.id
        })
        await TestofLabJob.update({ Status: 'true' }, // Set the status field to true
            { where: { Testid: testid } } // Update the record where labjobid matches
        );

        res.status(201).json({ message: "Test is sumbited" });

    } catch (error) {
        res.status(500).json({ error: "error Sumbiting Test" });
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router