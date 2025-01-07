const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const CustomerOrder = require('../schemas/Order');
const User = require('../schemas/User');
const ClientUser = require('../schemas/ClientUser');
const Client = require('../schemas/Client');
const CustomerRegistration = require('../schemas/CustomerRegistration');
const router = express.Router();
const { BrickCompressiveStrength1, BrickCompressiveStrength2 } = require("../schemas/BricksCompressiveStrength");
const { logError } = require('./logError');
const { TestofLabJob, LabJob } = require('../schemas/LabJobNo');
const { Staffofcompany } = require('../schemas/staffmaster');

router.post('/Brick-Compressive-Strength', authenticateToken, async(req, res) => {

    try {
        const {
            labjobid,
            testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            dateTimeStorageUnderJuteBags,
            dateTimeImmersionAfterGrinding,
            dateTimeRemovalFromJuteBags,
            dateTimeRemovalFromWater,
            dateTimeImmersionInWater,
            roomTemp,
            dateTimeFrogFilling,
            averagecompressiveStrength,
            unit,
            tests
        } = req.body;

        const data = await BrickCompressiveStrength1.create({
            labJobId: req.body.labjobid,
            testId: req.body.testid,
            sampleTestedDateFrom,
            sampleTestedDateTo,
            dateTimeFrogFilling,
            dateTimeImmersionAfterGrinding,
            dateTimeImmersionInWater,
            dateTimeRemovalFromJuteBags,
            dateTimeRemovalFromWater,
            dateTimeStorageUnderJuteBags,
            roomTemp,
            averagecompressiveStrength,
            unit,
            UserId: req.user.id
        })

        for (const test of tests) {
            const testvalue = await BrickCompressiveStrength2.create({
                idMark: test.idMark,
                length: test.length,
                breadth: test.breadth,
                averageArea: test.averageArea,
                maxLoad: test.maxLoad,
                compressiveStrength: test.compressiveStrength,
                BrickCompressiveStrength1Id: data.id
            })
        }
        await TestofLabJob.update({ Status: 'true' }, // Set the status field to true
            { where: { Testid: testid } } // Update the record where labjobid matches
        );


        res.status(201).json({ message: "Test is sumbited" });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/get-Brick-Compressive-Strength/:labJobId", authenticateToken, async(req, res) => {
    try {
        const labJobId = req.params.labJobId;

        const data = await BrickCompressiveStrength1.findOne({
            where: { labJobId },
            include: [{
                model: User,
                as: "Useralldata",
                attributes: ['createdBy'],
                where: { createdBy: req.user.createdBy }
            }, {
                model: BrickCompressiveStrength2,
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

        const company = data.da && data.da ? data.da.createdBy : null;

        const companyname = await Client.findOne({
            where: { UserId: company },
            attributes: ['LaboratoryName']
        })



        res.status(200).json({ data, companyname })

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