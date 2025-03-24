const express = require('express');
const router = express.Router();
const { models } = require('../config/db');
const determineTestType = require("../testTypeMapping");
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const multer = require("multer")
const path = require("path");
const fs = require('fs');
const { getTemplateData, processFieldMappings } = require('../config/getFieldMappings');
const { getInfoData, processinfoMappings } = require('../config/getInfoFieldMappings');
const testNameToSchemaMapping = require('../config/testNameToSchemaMapping');
const schemasConfig = require('../config/schemasConfig');
const defineAssociations = require('../config/dynamicAssociations');
const applyConditionalFields = require('../config/applyConditionalFields');
const { copyStringIntoBuffer } = require('pdf-lib');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/templates")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage });
router.use('/public', express.static('public'));


// Create API endpoint to create a new product and test details
router.post('/master', authenticateToken, upload.single('pdfTemplatePath'), async(req, res) => {
    try {
        const { field, productGroup, productMaterial, testName, testMethod, year, InfoMaping, TemplateMaping } = req.body;
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: 'You do not have permission to create an Master' });
        }

        // Find or create the product
        const [product, created] = await models.Product.findOrCreate({
            where: { name: productMaterial, ProductGroup: productGroup, Field: field },
            defaults: { name: productMaterial, ProductGroup: productGroup, Field: field }
        });
        const pdfTemplatePath = req.file ? req.file.path : null; // Store the file path if the file is uploaded

        // Create test details
        await models.TestDetails.create({ TestName: testName, TestMethod: testMethod, Year: year, InfoMaping, TemplateMaping, pdfTemplatePath, ProductId: product.id });

        res.status(200).json({ message: 'Master data created successfully' });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/all-master-data', authenticateToken, async(req, res) => {
    try {
        // Fetch data from Product and associated TestDetails
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: 'You do not have permission to see Master' });
        }
        const products = await models.Product.findAll({
            include: [{
                model: models.TestDetails,
                as: 'testDetails',
                order: [
                        ['createdAt', 'DESC']
                    ] // Sort by creation date, most recent first
            }],
            order: [
                ['createdAt', 'DESC'] // Sort products by creation date, most recent first
            ]
        });

        // Format data for table display
        const formattedData = products.map(product => ({
            id: product.id,
            name: product.name,
            ProductGroup: product.ProductGroup,
            Field: product.Field,
            testDetails: product.testDetails.map(detail => ({
                id: detail.id,
                TestName: detail.TestName,
                TestMethod: detail.TestMethod,
                Year: detail.Year
            }))
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/master-data-by-id', authenticateToken, async(req, res) => {
    try {
        const { id, testid } = req.query;
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: 'You do not have permission to see Master' });
        }
        const getdata = await models.Product.findOne({
            where: { id },
            include: [{
                model: models.TestDetails,
                as: 'testDetails',
                where: { id: testid }
            }]
        })
        res.status(200).json(getdata)
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.put('/update-master', upload.single('pdfTemplatePath'), authenticateToken, async(req, res) => {
    try {
        const { id, testid } = req.query;

        const { Field, ProductGroup, name, TestName, TestMethod, Year } = req.body
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: 'You do not have permission to see Master' });
        }
        const updateproduct = await models.Product.findOne({ where: { id } })
        const updatetest = await models.TestDetails.findOne({ where: { id: testid, ProductId: id } })

        if (!updateproduct || !updatetest) {
            return res.status(500).json({ error: 'master not found' })
        }
        const update = await updateproduct.update({
            Field,
            ProductGroup,
            name
        })
        const pdfTemplatePath = req.file ? req.file.path : null;
        const up = await updatetest.update({
            TestName,
            TestMethod,
            Year,
            pdfTemplatePath
        })

        res.status(200).json({ message: 'Master data updated successfully' })

    } catch (error) {
        console.error(error);
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/test/:testId', authenticateToken, async(req, res) => {
    try {
        const testId = req.params.testId;
        const testDetails = await models.TestDetails.findByPk(testId, { include: [Product] });

        if (!testDetails) {
            return res.status(404).json({ message: 'Test not found' });
        }

        const { name: productName } = testDetails.Product;
        const { TestName: testName } = testDetails;
        const testType = determineTestType(productName, testName); // Correctly call with both productName and testName
        // console.log('Product Name:', productName); // Log product name for debugging
        // console.log('Test Name:', testName); // Log test name for debugging
        // console.log('Determined Test Type:', testType); // Log determined test type for debugging

        res.status(200).json({ testDetails, testType });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/products-with-testdetails', async(req, res) => {
    try {
        const products = await models.Product.findAll({
            include: [{
                model: models.TestDetails,
                as: 'testDetails'
            }]
        });
        res.json(products);
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});


// In the backend, define your models and add the necessary associations.


// Get the PDF template and associated field values
router.get('/api/templates', authenticateToken, async(req, res) => {
    try {
        const { labjobid, testid, productName } = req.query;
        // Fetch TestDetails with associated Fiveentrytemplate and Valueoffiveentrytemplate
        const testDetails = await models.TestDetails.findOne({
            where: { id: testid },
        });
        const testName = testDetails.TestName;
        const templateType = testDetails.TemplateMaping;
        const infoType = testDetails.InfoMaping;
        if (!testDetails) {
            return res.status(404).json({ error: 'Test details not found' });
        }
        // Fetch field mappings and joint data dynamically based on template type (Five, Six, Seven)
        const { fieldMappings, jointData } = await getTemplateData(testid, templateType);
        const { infoMappings, jointInfoData } = await getInfoData(testid, infoType);
        // Validate testName for the given productName
        const productSchemas = testNameToSchemaMapping[productName];
        if (!testName || !productSchemas[testName]) {
            return res.status(400).json({ error: "Invalid or missing test name for the specified product" });
        }
        const schemaName = productSchemas[testName];
        if (!schemaName) {
            return res.status(400).json({ error: "Schema configuration not found" });
        }
        // Check if parent schema exists
        if (!schemasConfig[schemaName]) {
            return res.status(400).json({ error: "Parent schema configuration not found" });
        }
        const { model1, model2 } = schemasConfig[schemaName];
        const SchemaModel1 = models[model1.model];
        const SchemaModel2 = models[model2.model];
        // Check if association exists
        if (!SchemaModel1.associations[model2.labjointkey]) {
            await defineAssociations(schemaName);
        }
        const alias2 = model2.labjointkey || null;
        // Accessing models dynamically using bracket notation
        const parentKey = model2.relation === 'child' ? model2.jointkey : null;
        // Example for fetching acId (using SchemaModel1)
        const data = await models.LabJob.findOne({
            where: { id: labjobid, },
            include: [{
                model: models.User,
                as: "userdata",
                where: { createdBy: req.user.createdBy }
            }, {
                model: models.CustomerOrder,
                as: 'customerOrder',
                attributes: ['DOROO']

            }, {
                model: models.Staffofcompany,
                as: "staffofcompany"
            }, {
                model: models.Staffofcompany,
                as: 'verifiedByStaff',
            }, {
                model: SchemaModel1,
                where: { testId: testid },
                as: alias2,
                include: [{
                    model: SchemaModel2,
                    as: parentKey
                }]
            }]
        });
        const datasheetformate = await models.Masterlistofrecord.findOne({ where: { testId: testid, UserId: req.user.createdBy }, attributes: ['datasheetformateno'] })

        const companyname = await models.Client.findOne({
            where: { UserId: req.user.createdBy },
            attributes: ['LaboratoryName']
        })

        if (!data) {
            return res.status(404).json({ error: 'Crushing Value not found for this test' });
        }
        const responseData = {
            SampleReceived: data.customerOrder.DOROO,
            SampleTested: (data[alias2] && data[alias2][0] && data[alias2][0].SampleTested) || null,
            DescriptionofSample: (data[alias2] && data[alias2][0] && data[alias2][0].DescriptionofSample) || null,
            LaboratoryName: companyname.LaboratoryName,
            parentKey: data[alias2] && data[alias2][0][parentKey] ? data[alias2][0][parentKey].map(entry => {
                const mappedEntry = {};
                Object.keys(entry).forEach(key => {
                    mappedEntry[key] = entry[key];
                });
                return mappedEntry;
            }) : [],
            labJobNo: data.labJobNo,
            sampleCodeNo: data.sampleCodeNo,
            testedby: data.staffofcompany.Name,
            testsignby: data.staffofcompany.ScanSign,
            testedDesignation: data.staffofcompany.Designation,
            verifiedby: data.verifiedByStaff ? data.verifiedByStaff.Name : null,
            verifiedbysign: data.verifiedByStaff ? data.verifiedByStaff.ScanSign : null,
            verifiedbyDesignation: data.verifiedByStaff ? data.verifiedByStaff.Designation : null,
            datasheetformateno: datasheetformate.datasheetformateno
        };

        applyConditionalFields(productName, testName, responseData, data, alias2)

        // // Process the field mappings to get initial form data
        const initialFormData = processFieldMappings(fieldMappings, jointData);
        const infoFormData = processinfoMappings(infoMappings, jointInfoData);
        const allmappingfield = {
                ...infoFormData,
                "Company Name": "LaboratoryName",
                'DataSheet Formate No': 'datasheetformateno',
                'Tested by': 'testedby',
                'test sign by': 'testsignby',
                'tested Designation': 'testedDesignation',
                'Verified by': "verifiedby",
                'Verified by sign': 'verifiedbysign',
                'Verified by Designation': "verifiedbyDesignation"
            }
            // Extract keys of repeatable fields as an array
        const repeatableFieldsKeys = Object.keys(initialFormData);

        // Process repeatable fields (initialFormData)
        // Dynamically generate repeatable values
        const repeatableValues = responseData.parentKey.map((entry, entryIndex) => {
            return repeatableFieldsKeys.reduce((acc, header) => {
                // Skip fields with "Mean" or "Average"
                if (header.toLowerCase().includes("mean") || header.toLowerCase().includes("average")) {
                    return acc; // Skip this field
                }

                const fieldKey = initialFormData[header];
                if (entry.dataValues && entry.dataValues.hasOwnProperty(fieldKey)) {
                    acc[header] = entry.dataValues[fieldKey];
                } else {
                    acc[header] = null; // Handle missing fields gracefully
                }
                return acc;
            }, {});
        });
        // Extract single-occurrence fields (allmappingfield excluding repeatableFieldsKeys)
        const singleValues = Object.keys(allmappingfield).reduce((acc, header) => {
            if (!repeatableFieldsKeys.includes(header)) {
                const fieldKey = allmappingfield[header];
                acc[header] = responseData[fieldKey] || "";
            }
            return acc;

        }, {});
        // Merge single-occurrence fields with repeatable fields
        const populatedValues = {
            singleFields: singleValues,
            repeatableFields: repeatableValues
        };

        // Send the data as the response

        const normalizedFilePath = testDetails.pdfTemplatePath.replace(/\\/g, '/');

        res.json({ populatedValues, normalizedFilePath });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});



module.exports = router;