const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const { DensityOfCementUsingLeChatelierFlask1, DensityOfCementUsingLeChatelierFlask2 } = require('../schemas/DensityOfCementUsingLeChatelierFlask');
const { TestofLabJob } = require('../schemas/LabJobNo');
const router = express.Router();

router.post("/Density-Of-Cement-Using-Le-Chatelier-Flask", authenticateToken, async(req, res) => {
    try {
        const {
            labjobid,
            testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            SpecificGravityOfKerosene,
            RoomTemp,
            AverageDensity,
            unit,
            tests
        } = req.body

        const data = await DensityOfCementUsingLeChatelierFlask1.create({
            labJobId: req.body.labjobid,
            testId: req.body.testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            SpecificGravityOfKerosene,
            RoomTemp,
            AverageDensity,
            unit,
            UserId: req.user.id
        })
        for (const test of tests) {
            const testvalue = await DensityOfCementUsingLeChatelierFlask2.create({
                WeightOfCement: test.WeightOfCement,
                InitialReadingOfFlask: test.InitialReadingOfFlask,
                FinalReadingOfFlask: test.FinalReadingOfFlask,
                DisplacedVolumeOfCementParticles: test.DisplacedVolumeOfCementParticles,
                Density: test.Density,
                DensityOfCementUsingLeChatelierFlask1Id: data.id
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