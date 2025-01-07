const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const { CementbyDrySieving1, CementbyDrySieving2 } = require('../schemas/CementbyDrySieving');
const { TestofLabJob } = require('../schemas/LabJobNo');
const router = express.Router();

router.post("/Cement-by-Dry-Sieving", authenticateToken, async(req, res) => {
    try {
        const {
            labjobid,
            testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            Mean,
            unit,
            tests
        } = req.body

        const data = await CementbyDrySieving1.create({
            labJobId: req.body.labjobid,
            testId: req.body.testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            Mean,
            unit,
            UserId: req.user.id
        })
        for (const test of tests) {
            const testvalue = await CementbyDrySieving2.create({
                W1: test.W1,
                W2: test.W2,
                Residue: test.Residue,
                CementbyDrySieving1Id: data.id
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