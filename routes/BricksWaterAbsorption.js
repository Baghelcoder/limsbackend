const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const { BricksWaterAbsorption1, BricksWaterAbsorption2 } = require('../schemas/BricksWaterAbsorption');
const { TestofLabJob } = require('../schemas/LabJobNo');
const router = express.Router();


router.post("/BRICKS-WATER-ABSORPTION", authenticateToken, async(req, res) => {
    try {
        const {
            labjobid,
            testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            ovenDryTemperature,
            immersionTemperature,
            dateAndTimeOfImmersionInWater,
            dateAndTimeOfRemovalFromWater,
            mean,
            unit,
            entries
        } = req.body;

        const data = await BricksWaterAbsorption1.create({
            labJobId: req.body.labjobid,
            testId: req.body.testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            ovenDryTemperature,
            immersionTemperature,
            dateAndTimeOfImmersionInWater,
            dateAndTimeOfRemovalFromWater,
            mean,
            unit,
            UserId: req.user.id
        })

        for (const entry of entries) {
            const entryvalue = await BricksWaterAbsorption2.create({
                M1: entry.M1,
                M2: entry.M2,
                waterAbsorption: entry.waterAbsorption,
                BricksWaterAbsorption1Id: data.id
            })
        }
        await TestofLabJob.update({ Status: 'true' }, // Set the status field to true
            { where: { Testid: testid } } // Update the record where labjobid matches
        );

        res.status(201).json({ message: "Test is sumbited" });

    } catch (error) {
        res.status(500).json({ error: "error Sumbiting Test" });
        if (err.name) {
            await logError(err.message, err.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', err.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
})





module.exports = router;