const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { models } = require('../config/db');
const Masterlistofrecord = models.Masterlistofrecord
const { logError } = require('./logError');
const TestDetails = models.TestDetails
const Product = models.Product
const Masterofreportformate = models.Masterofreportformate
const router = express.Router();

router.post('/master-list-of-records', authenticateToken, async(req, res) => {
    try {
        const { selecttest, selectedProduct, datasheetformateno, issueno, revno, revdate, remark } = req.body
        const data = await Masterlistofrecord.create({
            testId: req.body.selecttest,
            productId: req.body.selectedProduct,
            datasheetformateno,
            issueno,
            revno,
            revdate,
            remark,
            UserId: req.user.id
        })

        res.status(200).json({ message: 'master is added' })

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/get-master-list-of-records', authenticateToken, async(req, res) => {
    try {
        const records = await Masterlistofrecord.findAll({
            where: { UserId: req.user.id },
            include: [{
                    model: TestDetails,
                    as: 'testDetails',
                    attributes: ['TestName', 'TestMethod']
                },
                {
                    model: Product,
                    as: 'product',
                    attributes: ['name']
                }
            ]
        });

        res.status(200).json(records);
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get-master-list-of-records-by-testid/:testid', authenticateToken, async(req, res) => {
    try {
        const { testid } = req.params;
        const datasheet = await Masterlistofrecord.findOne({
            where: { testId: testid, UserId: req.user.createdBy },
            attributes: ['datasheetformateno']
        })

        res.status(200).json(datasheet)

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/get-master-list-of-records-by-id/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const datasheet = await Masterlistofrecord.findOne({
            where: { id, UserId: req.user.id },
        })
        res.status(200).json(datasheet)
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/update-master-list-of-records/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params; // Get the record ID from the URL
        const { selecttest, selectedProduct, datasheetformateno, issueno, revno, revdate, remark } = req.body; // Extract updated fields

        // Find the existing record
        if (req.user.role !== 'client') {
            return res.status(404).json({ error: "You are not Authorized for this" })
        }
        const existingRecord = await Masterlistofrecord.findByPk(id);

        if (!existingRecord) {
            return res.status(404).json({ error: 'Master list of Record Formate not found' });
        }

        // Update the record with new values
        await existingRecord.update({
            productId: selectedProduct,
            testId: selecttest,
            datasheetformateno,
            issueno,
            revno,
            revdate,
            remark,
            UserId: req.user.id // Optionally update UserId as well if required
        });

        res.status(200).json({ message: 'Master list of Record updated successfully' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body, recordId: req.params.id });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body, recordId: req.params.id });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/delete-master-list-of-records/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params; // Get the record ID from the URL
        // Find the existing record
        if (req.user.role !== 'client') {
            return res.status(404).json({ error: "You are not Authorized for this" })
        }
        const existingRecord = await Masterlistofrecord.findByPk(id);
        if (!existingRecord) {
            return res.status(404).json({ error: 'Master list of Record not found' });
        }
        // Delete the record
        await existingRecord.destroy();
        res.status(200).json({ message: 'Master list of Record deleted successfully' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, { recordId: req.params.id });
        } else {
            await logError('Unexpected error occurred', error.stack, { recordId: req.params.id });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/master-of-report-formate', authenticateToken, async(req, res) => {
    try {

        const { selectedProduct, reportformateno, issueno, revno, revdate, remark } = req.body

        const data = await Masterofreportformate.create({
            productId: req.body.selectedProduct,
            reportformateno,
            issueno,
            revno,
            revdate,
            remark,
            UserId: req.user.id
        })
        res.status(200).json({ message: 'master is added' })
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.get('/get-master-of-report-formate', authenticateToken, async(req, res) => {
    try {
        const records = await Masterofreportformate.findAll({
            where: { UserId: req.user.id },
            include: [{
                model: Product,
                as: 'product',
                attributes: ['name']
            }]
        });

        res.status(200).json(records);
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/get-master-of-report-formate-by-product/:selectedProduct", authenticateToken, async(req, res) => {
    try {
        const { selectedProduct } = req.params;
        const records = await Masterofreportformate.findOne({
            where: { UserId: req.user.createdBy, productId: selectedProduct },
        });
        return res.status(200).json(records)
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get("/get-master-of-report-formate-by-id/:id", authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role === 'client') {
            const records = await Masterofreportformate.findOne({
                where: { UserId: req.user.id, id },
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['name']
                }]
            });
            res.status(200).json(records)
        } else if (req.user.role === 'user') {
            const records = await Masterofreportformate.findAll({
                where: { UserId: req.user.createdBy, id },
            });
            res.status(200).json(records)
        }
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/update-master-of-report-formate/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params; // Get the record ID from the URL
        const { selectedProduct, reportformateno, issueno, revno, revdate, remark } = req.body; // Extract updated fields

        // Find the existing record
        const existingRecord = await Masterofreportformate.findByPk(id);

        if (!existingRecord) {
            return res.status(404).json({ error: 'Master of Report Formate not found' });
        }

        // Update the record with new values
        await existingRecord.update({
            productId: selectedProduct,
            reportformateno,
            issueno,
            revno,
            revdate,
            remark,
            UserId: req.user.id // Optionally update UserId as well if required
        });

        res.status(200).json({ message: 'Master of Report Formate updated successfully' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body, recordId: req.params.id });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body, recordId: req.params.id });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.delete('/delete-master-of-report-formate/:id', authenticateToken, async(req, res) => {
    try {
        const { id } = req.params; // Get the record ID from the URL
        // Find the existing record
        const existingRecord = await Masterofreportformate.findByPk(id);
        if (!existingRecord) {
            return res.status(404).json({ error: 'Master of Report Formate not found' });
        }
        // Delete the record
        await existingRecord.destroy();
        res.status(200).json({ message: 'Master of Report Formate deleted successfully' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, { recordId: req.params.id });
        } else {
            await logError('Unexpected error occurred', error.stack, { recordId: req.params.id });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = router