const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const { DimensionofBricks1, DimensionofBricks2 } = require('../schemas/DimensionofBricks');
const { TestofLabJob, LabJob } = require('../schemas/LabJobNo');
const User = require('../schemas/User');
const { Staffofcompany } = require('../schemas/staffmaster');
const Client = require('../schemas/Client');
const router = express.Router();


router.post('/Dimension-of-Bricks', authenticateToken, async(req, res) => {
    try {
        const {
            labjobid,
            testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            averageofaveragelength,
            averageofaveragewidth,
            averageofaverageheigth,
            unit,
            tests
        } = req.body

        const data = await DimensionofBricks1.create({
            labJobId: req.body.labjobid,
            testId: req.body.testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            averageofaveragelength,
            averageofaveragewidth,
            averageofaverageheigth,
            unit,
            UserId: req.user.id
        })

        for (const test of tests) {
            const testvalue = await DimensionofBricks2.create({
                lengthface1: test.lengthface1,
                lengthface2: test.lengthface2,
                averagelength: test.averagelength,
                widthface1: test.widthface1,
                widthface2: test.widthface2,
                averagewidth: test.averagewidth,
                heigthface1: test.heigthface1,
                heigthface2: test.heigthface2,
                averageheigth: test.averageheigth,
                DimensionofBricks1Id: data.id
            })
        }
        await TestofLabJob.update({ Status: 'true' }, // Set the status field to true
            { where: { Testid: testid } } // Update the record where labjobid matches
        );


        res.status(201).json({ message: "Test is sumbited" });

    } catch (error) {
        console.error(error);
        await logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/get-dimension-of-bricks/:labJobId', authenticateToken, async(req, res) => {
    try {
        const labJobId = req.params.labJobId;

        const data = await DimensionofBricks1.findOne({
            where: { labJobId },
            include: [{
                model: User,
                as: "da",
                attributes: ['createdBy'],
                where: { createdBy: req.user.createdBy },
                include: [{
                    model: Client,
                    as: "creator",
                    attributes: ['LaboratoryName']
                }]
            }, {
                model: DimensionofBricks2,
                as: "alldata"
            }, {
                model: LabJob,
                as: 'dimensionofBricks',
                include: [{
                    model: Staffofcompany,
                    as: "staffofcompany"
                }, {
                    model: Staffofcompany,
                    as: 'verifiedByStaff',
                }]
            }]
        })

        res.status(200).json(data)

    } catch (error) {
        console.error(error);
        await logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router