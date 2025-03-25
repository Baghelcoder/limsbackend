const { models } = require('../config/db');
const defineAssociations = require("./dynamicAssociations");
const schemasConfig = require("./schemasConfig");
const testNameToSchemaMapping = require("./testNameToSchemaMapping");
const getDynamicInclude = require('./dynamicIncludeMapping');

async function fetchLabJobDetails({ labJobNo, sampleCodeNo, userId, createdBy }) {
    try {
        const testdata = await models.LabJob.findOne({
            where: { labJobNo, sampleCodeNo, isTestfilled: 'true' },
            include: [{
                    model: models.TestofLabJob,
                    as: 'testofLabJobs',
                    include: [{ model: models.TestDetails, as: 'testDetails', attributes: ['TestName'] }]
                },
                { model: models.Product, as: 'product', attributes: ['name', 'ProductGroup', 'Field'] },
                {
                    model: models.User,
                    as: 'userdata',
                    attributes: ['createdBy'],
                    where: { createdBy }
                },
            ]
        });
        if (!testdata) throw new Error('No matching LabJob found');

        const productname = testdata && testdata.product && testdata.product.name || null;
        const productSchemas = testNameToSchemaMapping[productname];

        const testNames = (testdata.testofLabJobs || [])
            .map(job => (job.testDetails ? job.testDetails.TestName : null))
            .filter(Boolean);

        if (!testNames.length) throw new Error('No TestName found in LabJob');


        const schemasAndAliases = testNames.map(testName => {
            const schemaName = productSchemas[testName];
            if (!schemaName) return null;
            const { model1, model2 } = schemasConfig[schemaName];

            const SchemaModel1 = models[model1.model];

            return {
                alias2: model2.labjointkey || null,
                schemaName,
                parentKey: model2.relation === 'child' ? model2.jointkey : null,
                alias3: model2.testjointkey || null,
                testId: model2.testId || null,
                testName,
                SchemaModel1,
                model2
            };
        }).filter(Boolean);
        // First, ensure associations are defined before the query

        await Promise.all(schemasAndAliases.map(async(entry) => {
            const { schemaName, SchemaModel1 } = entry;
            const { model2 } = schemasConfig[schemaName];

            if (!SchemaModel1.associations[model2.labjointkey]) {
                entry.alias2 = await defineAssociations(schemaName); // dynamically update alias2
            }
        }));

        const labJobId = testdata && testdata.id || null;
        const dynamicData = await Promise.all(
            schemasAndAliases.map(async({ testName, model2, alias3, testId, SchemaModel1, parentKey }) => {
                const includeArray = getDynamicInclude(productname, testName, model2, alias3, parentKey);
                const result = await SchemaModel1.findOne({
                    where: { labJobId, testId },
                    include: includeArray
                });
                return result ? result.toJSON() : null;
            })
        );
        const [customerOrder, verified, authrized] = await Promise.all([
            models.CustomerOrder.findOne({
                where: { id: testdata.customerOrderId },
                attributes: ['id', 'DOROO', 'ClientName', 'ProjectName', 'Location', 'RegistrationId', 'LetterDated', 'ReferenceNo', 'ReportwithNABL'],
                include: {
                    model: models.CustomerRegistration,
                    as: 'customerdata',
                    attributes: ['CustName', 'Address', 'City', 'State', 'Pin']
                }
            }),
            models.Staffofcompany.findOne({
                where: { id: testdata.verifiedby },
                attributes: ['Name', 'Designation', 'ScanSign']
            }),
            models.Staffofcompany.findOne({
                where: { id: testdata.AuthorisedSignatory },
                attributes: ['Name', 'Designation', 'ScanSign']
            })
        ]);

        const compnydata = await models.Client.findOne({
            where: { UserId: createdBy },
            attributes: ['LaboratoryName', 'NABLCertificateNo',
                'NABLLogo', 'Logo', 'NABLvalidityFrom', 'NABLvalidityTo'
            ]
        });

        const labJobData = testdata.toJSON();
        // Exclude testofLabJobs from the response
        delete labJobData.testofLabJobs;
        delete labJobData.userdata;
        // Merge dynamic data into labJobData
        labJobData.dynamicIncludes = dynamicData.filter(Boolean);
        if (customerOrder) labJobData.customerOrder = customerOrder.toJSON();
        if (verified) labJobData.verified = verified.toJSON();
        if (authrized) labJobData.authrized = authrized.toJSON();
        Object.keys(labJobData).forEach(key => {
            if (Array.isArray(labJobData[key]) && labJobData[key].length === 0) {
                delete labJobData[key];
            }
        });
        const aliasData = schemasAndAliases.map(entry => ({
            alias3: entry.alias3,
            parentKey: entry.parentKey
        }));
        return { labJobData, compnydata, aliasData }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { fetchLabJobDetails };