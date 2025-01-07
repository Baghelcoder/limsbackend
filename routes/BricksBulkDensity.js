const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { BricksBulkDensity1, BricksBulkDensity2 } = require('../schemas/BricksBulkDensity');
const { TestofLabJob } = require('../schemas/LabJobNo');
const router = express.Router();

router.post("/Bricks-Bulk-Density", authenticateToken, async(req, res) => {
    try {
        const {
            labjobid,
            testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            ovenDryTemperature,
            AverageDensity,
            unit,
            tests
        } = req.body

        const data = await BricksBulkDensity1.create({
            labJobId: req.body.labjobid,
            testId: req.body.testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            ovenDryTemperature,
            AverageDensity,
            unit,
            UserId: req.user.id
        })

        for (const test of tests) {
            const testvalue = await BricksBulkDensity2.create({
                mark: test.mark,
                Length: test.Length,
                Width: test.Width,
                Height: test.Height,
                Volume: test.Volume,
                Mass: test.Mass,
                Density: test.Density,
                BricksBulkDensity1Id: data.id
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