const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const { CementSoundnessByLeChatelierMethod1, CementSoundnessByLeChatelierMethod2 } = require('../schemas/CementSoundnessByLeChatelierMethod');
const { TestofLabJob } = require('../schemas/LabJobNo');
const router = express.Router();

router.post("/Cement-Soundness-By-Le-Chatelier-Method", authenticateToken, async(req, res) => {
    try {
        const {
            labjobid,
            testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            MouldingRoomTemp,
            MouldingRoomHumidity,
            WeightOfCement,
            WeightofWater,
            Mean,
            unit,
            tests
        } = req.body

        const data = await CementSoundnessByLeChatelierMethod1.create({
            labJobId: req.body.labjobid,
            testId: req.body.testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            MouldingRoomTemp,
            MouldingRoomHumidity,
            WeightOfCement,
            WeightofWater,
            Mean,
            unit,
            UserId: req.user.id
        })

        for (const test of tests) {
            const testvalue = await CementSoundnessByLeChatelierMethod2.create({
                D1: test.D1,
                D2: test.D2,
                ExpansionOfCement: test.ExpansionOfCement,
                CementSoundnessByLeChatelierMethod1Id: data.id
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

module.exports = router