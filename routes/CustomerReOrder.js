const express = require('express');
const { models } = require('../config/db');
const authenticateToken = require('../middlewhere/authMiddleware');
const router = express.Router();
const { logError } = require("./logError");



router.post('/create-Customer', authenticateToken, async(req, res) => {
    try {
        const { CustName, Address, City, State, Pin, Country, PhoneNo, Email, GSTNo, ContactPersonName } = req.body;

        await models.CustomerRegistration.create({
            CustName,
            Address,
            City,
            State,
            Pin,
            Country,
            PhoneNo,
            Email,
            GSTNo,
            ContactPersonName,
            UserId: req.user.id
        })
        res.status(201).json({ message: 'Customer created' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get("/get-Customer", authenticateToken, async(req, res) => {
    try {
        const getcustomer = await models.CustomerRegistration.findAll({
            include: [{
                model: models.User,
                as: 'userinfo',
                where: { createdBy: req.user.createdBy }
            }]
        })
        res.status(200).json({ getcustomer })

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.post("/create-order-job", authenticateToken, async(req, res) => {
    try {
        const {
            SRFNo,
            DOROO,
            ClientName,
            ProjectName,
            ReferenceNo,
            LetterDated,
            OtherInformation,
            Location,
            SampleCollectedBy,
            ReportwithNABL,
            CRIIA,
            SOCR,
            EDOD,
            TestToBeWitnessed,
            MOTCARA,
            TSRMPBCO,
            TACOTAAPRR,
            AKPWITLIYPS,
            ADITM,
            RegistrationId,
            entries
        } = req.body;

        // Create the Customer Order
        const customerOrder = await models.CustomerOrder.create({
            SRFNo,
            DOROO,
            ClientName,
            ProjectName,
            ReferenceNo,
            LetterDated,
            OtherInformation,
            Location,
            SampleCollectedBy,
            ReportwithNABL,
            CRIIA,
            SOCR,
            EDOD,
            TestToBeWitnessed,
            MOTCARA,
            TSRMPBCO,
            TACOTAAPRR,
            AKPWITLIYPS,
            ADITM,
            RegistrationId,
            UserId: req.user.id // Assuming req.user.id is populated by authentication middleware
        });

        // Create associated Lab Jobs and Test of Lab Job entries
        for (const entry of entries) {
            const labJob = await models.LabJob.create({
                labJobNo: entry.labJobNo,
                sampleCodeNo: entry.SampleCodeNo,
                MaterialDescription: entry.MaterialDescription,
                MaterialBrand: entry.MaterialBrand,
                ProductId: entry.ProductId,
                signwith: entry.signwith,
                SampleQty: entry.SampleQty,
                customerOrderId: customerOrder.id,
                UserId: req.user.id, // Assuming req.user.id is populated by authentication middleware
                isTestfilled: 'false'
            });

            for (const testId of entry.Tests) {
                await models.TestofLabJob.create({
                    LabJobId: labJob.id,
                    Testid: testId,
                    Status: "false"
                });
            }
        }

        res.status(201).json({ message: 'Order and Lab Jobs created successfully.' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put("/update-lab-job/:id", authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const { verifiedby, AuthorisedSignatory, isTestfilled } = req.body
        const updatelabjob = await models.LabJob.update({
            verifiedby,
            AuthorisedSignatory,
            isTestfilled
        }, { where: { id } })

        return res.status(200).json({ message: 'employ updateed' })

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get("/get-Customer-Order", authenticateToken, async(req, res) => {
    try {
        const getOrders = await models.CustomerOrder.findAll({
            include: [{
                model: models.CustomerRegistration,
                attributes: ['CustName', 'Address', 'City', 'State', 'Pin', 'Country', 'PhoneNo', 'Email', 'GSTNo', 'ContactPersonName'],
                as: 'customerdata' // Make sure the alias matches the model association
            }, {
                model: models.User,
                as: 'userdata',
                where: { createdBy: req.user.createdBy }
            }]
        });

        res.status(200).json(getOrders);

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/get-orderby-id/:orderid", authenticateToken, async(req, res) => {
    try {
        const { orderid } = req.params;
        const orderdata = await models.CustomerOrder.findOne({ where: { id: orderid }, attributes: ['DOROO'] })
        res.status(200).json(orderdata)

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get("/get-jobdata-testdata/:id", authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;

        // Fetching LabJob data along with associated TestofLabJob and TestDetails
        const labJobData = await models.LabJob.findAll({
            where: { customerOrderId: id },
            include: [{
                    model: models.TestofLabJob,
                    as: 'testofLabJobs',
                    include: [{
                        model: models.TestDetails,
                        as: 'testDetails',
                        attributes: ['testName', 'testMethod', 'InfoMaping', 'TemplateMaping'] // Replace with your desired fields
                    }]
                },
                {
                    model: models.Product, // Include the Product model
                    as: 'product', // Use the correct alias here
                    attributes: ['id', 'name', 'productGroup'] // Replace with your desired fields
                }
            ]
        });

        if (!labJobData) {
            return res.status(404).json({ error: 'LabJob data not found for this customerOrderId' });
        }

        res.json(labJobData);

    } catch (error) {

        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

router.get('/get-all-labjob-test', authenticateToken, async(req, res) => {
    try {
        const labJobData = await models.LabJob.findAll({
            where: { isTestfilled: 'true' },
            include: [{
                    model: models.User,
                    as: 'userdata',
                    attributes: ['createdBy'],
                    where: { createdBy: req.user.createdBy }
                }, {
                    model: models.TestofLabJob,
                    where: { Status: 'true' },
                    as: 'testofLabJobs',
                    attributes: ['Status']
                },
                {
                    model: models.Product, // Include the Product model
                    as: 'product', // Use the correct alias here
                    attributes: ['id', 'name', 'productGroup'] // Replace with your desired fields
                }
            ]
        });
        if (!labJobData) {
            return res.status(404).json({ error: 'LabJob data not found for this customerOrderId' });
        }
        res.json(labJobData);
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