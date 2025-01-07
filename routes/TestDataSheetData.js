const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const { models, sequelize } = require('../config/db');
const TestofLabJob = models.TestofLabJob
const router = express.Router();
const schemasConfig = require('../config/schemasConfig'); // Adjust the path
const testNameToSchemaMapping = require('../config/testNameToSchemaMapping'); // Adjust the path
const User = models.User
const defineAssociations = require('../config/dynamicAssociations');

router.post("/test-data-post", authenticateToken, async(req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { filteredFormdata, tests, testName, productName } = req.body;
        // Validate productName first
        if (!productName || !testNameToSchemaMapping[productName]) {
            return res.status(400).json({ error: "Invalid or missing product name" });
        }
        // Validate testName for the given productName
        const productSchemas = testNameToSchemaMapping[productName];
        if (!testName || !productSchemas[testName]) {
            return res.status(400).json({ error: "Invalid or missing test name for the specified product" });
        }
        const schemaName = productSchemas[testName];
        // Check if parent schema exists
        if (!schemasConfig[schemaName]) {
            return res.status(400).json({ error: "Parent schema configuration not found" });
        }

        const { model1, model2 } = schemasConfig[schemaName];
        // Require Sequelize models for parent and child
        const parentModelInstance = models[model1.model];
        const childModelInstance = models[model2.model];
        // Map parent model data from filteredFormdata
        const parentData = Object.keys(model1.fields).reduce((acc, key) => {
            acc[key] = filteredFormdata[model1.fields[key]];
            return acc;
        }, {});
        // Create Parent Record
        const parentRecord = await parentModelInstance.create({
            ...parentData,
            UserId: req.user.id
        }, { transaction });
        // Create Child Records for each test entry
        for (const test of tests) {
            const childData = Object.keys(model2.fields).reduce((acc, key) => {
                acc[key] = test[model2.fields[key]];
                return acc;
            }, {});

            const parentKey = model2.relation === 'child' ? model2.parentKey : null;
            // Ensure parentKey is correctly set
            if (!parentKey) {
                throw new Error('Parent key is not defined or invalid');
            }
            // Check if the parent key is the expected "CommanschemaId" and set it
            childData[parentKey] = parentRecord.id; // Set foreign key to parent record id
            await childModelInstance.create({
                ...childData
            }, { transaction });
        }
        await TestofLabJob.update({ Status: 'true' }, {
            where: { Testid: filteredFormdata.testid, LabJobId: filteredFormdata.labjobid },
            transaction
        });
        await transaction.commit();
        res.status(201).json({ message: "Test is submitted" });
    } catch (error) {
        await transaction.rollback();
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/test-data-get", authenticateToken, async(req, res) => {
    try {
        const { productName, testName, testId, labJobId } = req.query;

        // Validate productName
        if (!productName || !testNameToSchemaMapping[productName]) {
            return res.status(400).json({ error: "Invalid or missing product name" });
        }

        // Validate testName for the given productName
        const productSchemas = testNameToSchemaMapping[productName];
        if (!testName || !productSchemas[testName]) {
            return res.status(400).json({ error: "Invalid or missing test name for the specified product" });
        }

        const schemaName = productSchemas[testName];
        if (!schemasConfig[schemaName]) {
            return res.status(400).json({ error: "Schema configuration not found" });
        }
        if (!SchemaModel1.associations[model2.labjointkey]) {
            await defineAssociations(schemaName);
        }
        const { model1, model2 } = schemasConfig[schemaName];
        const model1Instance = models[model1.model];
        const model2Instance = models[model2.model];
        const parentKey = model2.relation === 'child' ? model2.jointkey : null;
        const alias1 = model2.Userjointkey || null;
        // Fetch data from model1
        const model1Data = await model1Instance.findOne({
            where: { UserId: req.user.id, testId, labJobId }, // Customize as needed
            include: [{
                model: User,
                as: alias1,
                attributes: ['id', 'createdBy'],
                where: { createdBy: req.user.createdBy }
            }, {
                model: model2Instance,
                as: parentKey, // Ensure association alias matches your setup
            }],
        });

        if (!model1Data || model1Data.length === 0) {
            return res.status(404).json({ message: "No data found for the specified parameters" });
        }

        // Structure the response
        res.status(200).json({ model1Data, excludedKeys: { parentKey, alias1 } });
    } catch (error) {
        // Log error for debugging
        if (error.name) {
            await logError(error.message, error.stack, { query: req.query });
        } else {
            await logError('Unexpected error occurred', error.stack, { query: req.query });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router