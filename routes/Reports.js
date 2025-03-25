const express = require('express');
const { logError } = require('./logError');
const { models } = require('../config/db');
const LabJob = models.LabJob
const authenticateToken = require('../middlewhere/authMiddleware');
const User = models.User
const Oldreport = models.Oldreport
const Oldreportextanote = models.Oldreportextanote
const { fetchLabJobDetails } = require('../config/labJobService');
const router = express.Router();

router.get("/report", authenticateToken, async(req, res) => {
    try {
        const { labJobNo, sampleCodeNo } = req.query;
        const {
            labJobData,
            compnydata,
            aliasData
        } = await fetchLabJobDetails({
            labJobNo,
            sampleCodeNo,
            userId: req.user.id,
            createdBy: req.user.createdBy
        });
        return res.status(200).json({ labJobData, compnydata, aliasData });
        // Return the filtered labJob data
    } catch (error) {
        await logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        if (!res.headersSent) {
            await logError(error.message, error.stack, {...req.body });
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
})


router.post('/old-report-create', authenticateToken, async(req, res) => {
    try {
        const { labjobno, labjobId, urlno, issuedate, extranotes, reportformateId } = req.body

        const oldreport = await Oldreport.create({
            labjobno,
            labjobId,
            urlno,
            issuedate,
            reportformateId,
            UserId: req.user.id
        })

        if (Array.isArray(extranotes)) {
            for (const note of extranotes) {
                await Oldreportextanote.create({
                    extranotes: note, // Use the extracted note
                    oldreportId: oldreport.id
                });
            }
        } else {
            console.error('Extranotes is not an array:');
        }


        res.status(200).json({ message: 'Report Saved' })


    } catch (error) {
        await logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
    }

})

router.get('/get-old-report/:labjobno', authenticateToken, async(req, res) => {
    try {
        const { labjobno } = req.params;
        const getoldreport = await Oldreport.findOne({
            where: { labjobno, UserId: req.user.id },
            include: [{
                model: User,
                as: "usercheck",
                attributes: ['createdBy'],
                where: { createdBy: req.user.createdBy }
            }, {
                model: LabJob,
                as: 'allreportdata',
                attributes: ['labJobNo', 'sampleCodeNo']
            }, {
                model: Oldreportextanote,
                as: "reportnotes",
                attributes: ['extranotes']
            }]
        })
        const labJobNo = getoldreport && getoldreport.allreportdata && getoldreport.allreportdata.labJobNo || null;
        const sampleCodeNo = getoldreport && getoldreport.allreportdata && getoldreport.allreportdata.sampleCodeNo || null;

        const { labJobData, compnydata, aliasData } = await fetchLabJobDetails({
            labJobNo,
            sampleCodeNo,
            userId: req.user.id,
            createdBy: req.user.createdBy
        });
        return res.status(200).json({ labJobData, compnydata, getoldreport, aliasData })
            // Return the filtered labJob data
    } catch (error) {
        await logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})



module.exports = router