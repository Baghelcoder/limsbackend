const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const { models } = require('../config/db');
const Sixentrytemplate = models.Sixentrytemplate;
const Valueofsixentrytemplate = models.Valueofsixentrytemplate
const Sevenentrytemplate = models.Sevenentrytemplate
const Valueofsevenentrytemplate = models.Valueofsevenentrytemplate
const TestInfoFive = models.TestInfoFive
const TestInfoFiveValue = models.TestInfoFiveValue
const TestInfoFour = models.TestInfoFour
const TestInfoFourValue = models.TestInfoFourValue
const Fiveentrytemplate = models.Fiveentrytemplate
const Valueoffiveentrytemplate = models.Valueoffiveentrytemplate
const Twoentrytemplate = models.Twoentrytemplate
const Valueoftwoentrytemplate = models.Valueoftwoentrytemplate
const Threeentrytemplate = models.Threeentrytemplate
const Valueofthreeentrytemplate = models.Valueofthreeentrytemplate
const Fourentrytemplate = models.Fourentrytemplate
const Valueoffourentrytemplate = models.Valueoffourentrytemplate
const Eightentrytemplate = models.Eightentrytemplate
const Valueofeightentrytemplate = models.Valueofeightentrytemplate
const Nineentrytemplate = models.Nineentrytemplate
const Valueofnineentrytemplate = models.Valueofnineentrytemplate
const TestInfoSix = models.TestInfoSix
const TestInfoSixValue = models.TestInfoSixValue
const TestInfoSeven = models.TestInfoSeven
const TestInfoSevenValue = models.TestInfoSevenValue
const TestInfoEight = models.TestInfoEight
const TestInfoEightValue = models.TestInfoEightValue
const TestInfoNine = models.TestInfoNine
const TestInfoNineValue = models.TestInfoNineValue
const TestInfoTen = models.TestInfoTen
const TestInfoTenValue = models.TestInfoTenValue
const TestInfoEleven = models.TestInfoEleven
const TestInfoElevenValue = models.TestInfoElevenValue
const TestInfoTwelve = models.TestInfoTwelve
const TestInfoTwelveValue = models.TestInfoTwelveValue

const router = express.Router();

const model = {
    'two-entry-template-header': {
        main: Twoentrytemplate,
        values: Valueoftwoentrytemplate
    },
    'three-entry-template-header': {
        main: Threeentrytemplate,
        values: Valueofthreeentrytemplate
    },
    'four-entry-template-header': {
        main: Fourentrytemplate,
        values: Valueoffourentrytemplate
    },
    'five-entry-template-header': {
        main: Fiveentrytemplate,
        values: Valueoffiveentrytemplate
    },
    'six-entry-template-header': {
        main: Sixentrytemplate,
        values: Valueofsixentrytemplate
    },
    'seven-entry-template-header': {
        main: Sevenentrytemplate,
        values: Valueofsevenentrytemplate
    },
    'eight-entry-template-header': {
        main: Eightentrytemplate,
        values: Valueofeightentrytemplate
    },
    'nine-entry-template-header': {
        main: Nineentrytemplate,
        values: Valueofnineentrytemplate
    },
    'Test-Info-Four': {
        main: TestInfoFour,
        values: TestInfoFourValue
    },
    'Test-Info-Five': {
        main: TestInfoFive,
        values: TestInfoFiveValue
    },
    'Test-Info-Six': {
        main: TestInfoSix,
        values: TestInfoSixValue
    },
    'Test-Info-Seven': {
        main: TestInfoSeven,
        values: TestInfoSevenValue
    },
    'Test-Info-Eight': {
        main: TestInfoEight,
        values: TestInfoEightValue
    },
    'Test-Info-Nine': {
        main: TestInfoNine,
        values: TestInfoNineValue
    },
    'Test-Info-Ten': {
        main: TestInfoTen,
        values: TestInfoTenValue
    },
    'Test-Info-Eleven': {
        main: TestInfoEleven,
        values: TestInfoElevenValue
    },
    'Test-Info-Twelve': {
        main: TestInfoTwelve,
        values: TestInfoTwelveValue
    }
};

// Define expected field names
const infoFields = ['InfoOne', 'InfoTwo', 'InfoThree', 'InfoFour', 'InfoFive', 'InfoSix', 'InfoSeven', 'InfoEight', 'InfoNine', 'InfoTen', 'InfoEleven', 'InfoTwelve', 'HeaderOne', 'HeaderTwo', 'HeaderThree', 'HeaderFour', 'HeaderFive', 'HeaderSix', 'HeaderSeven', 'HeaderEight', 'HeaderNine'];
const valueInfoFields = ['ValueOfInfoOne', 'ValueOfInfoTwo', 'ValueOfInfoThree', 'ValueOfInfoFour', 'ValueOfInfoFive', 'ValueOfInfoSix', 'ValueOfInfoSeven', 'ValueOfInfoEight', 'ValueOfInfoNine', 'ValueOfInfoTen', 'ValueOfInfoEleven', 'ValueOfInfoTwelve', 'ValueOfHeaderOne', 'ValueOfHeaderTwo', 'ValueOfHeaderThree', 'ValueOfHeaderFour', 'ValueOfHeaderFive', 'ValueOfHeaderSix', 'ValueOfHeaderSeven', 'ValueOfHeaderEight', 'ValueOfHeaderNine'];

// Helper function to extract specified fields from formData
const extractSpecifiedFields = (formData, fields) => {
    const data = {};
    fields.forEach(field => {
        if (formData[field] !== undefined && formData[field] !== null) {
            data[field] = formData[field];
        }
    });
    return data;
};


// POST route for saving template data
router.post("/:testType", authenticateToken, async(req, res) => {
    try {
        const { testType } = req.params;
        const { formData, selectedProduct } = req.body;
        const { main: MainModel, values: ValueModel } = model[testType] || {};
        if (!MainModel || !ValueModel) {
            return res.status(400).json({ error: 'Invalid test type' });
        }

        // Check for missing fields
        const mainData = extractSpecifiedFields(formData, infoFields);
        mainData.testId = formData.selecttest;
        mainData.productId = selectedProduct;
        if (testType === "Test-Info-Five" || 'Test-Info-Four') {
            mainData.NameofTest = formData.NameofTest;
            mainData.MethodofTest = formData.MethodofTest;
        }

        const data = await MainModel.create(mainData);

        const valueData = extractSpecifiedFields(formData, valueInfoFields);
        valueData[`${MainModel.name}Id`] = data.id;

        await ValueModel.create(valueData);

        res.status(200).json({ message: 'Template saved' });

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route for retrieving template data
router.get('/:testType', authenticateToken, async(req, res) => {
    try {
        const { testType } = req.params;

        const { productId, testId } = req.query;
        const { main: MainModel, values: ValueModel } = model[testType] || {};
        if (!MainModel || !ValueModel) {
            return res.status(400).json({ error: 'Invalid test type' });
        }
        if (testType === "Test-Info-Five" || 'Test-Info-Four') {
            const dynamicIdField = `${MainModel.name}Id`;
            const getdata = await MainModel.findOne({
                where: { productId, testId },
                attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'productId', 'testId'] },
                include: [{
                    model: ValueModel,
                    as: `${MainModel.name}joint`,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'id', dynamicIdField] },
                }]
            });
            res.status(200).json(getdata);
        } else {
            const getdata = await MainModel.findOne({
                where: { productId, testId },
                attributes: { exclude: ['id', 'productId', 'testId'] },
                include: [{
                    model: ValueModel,
                    as: `${MainModel.name}joint`,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
                }]
            });
            res.status(200).json(getdata);
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

module.exports = router;