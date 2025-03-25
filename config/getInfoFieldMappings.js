// getInfoFieldMappings.js
const { models } = require('./db');
const getInfoData = async(testid, infoType) => {
    let infoMappings = null;
    let dynamicKey = '';

    // Select the schema based on the templateType (Five, Six, Seven, etc.)
    switch (infoType) {
        case 'Test-Info-Four':
            infoMappings = await models.TestInfoFour.findOne({
                where: { testId: testid },
                include: [{
                    model: models.TestInfoFourValue,
                    as: 'TestInfoFourjoint',
                }],
            });
            dynamicKey = 'TestInfoFourjoint';
            break;
        case 'Test-Info-Five':
            infoMappings = await models.TestInfoFive.findOne({
                where: { testId: testid },
                include: [{
                    model: models.TestInfoFiveValue,
                    as: 'TestInfoFivejoint',
                }],
            });
            dynamicKey = 'TestInfoFivejoint';
            break;
        case 'Test-Info-Six':
            infoMappings = await models.TestInfoSix.findOne({
                where: { testId: testid },
                include: [{
                    model: models.TestInfoSixValue,
                    as: 'TestInfoSixjoint',
                }],
            });
            dynamicKey = 'TestInfoSixjoint';
            break;
        case 'Test-Info-Seven':
            infoMappings = await models.TestInfoSeven.findOne({
                where: { testId: testid },
                include: [{
                    model: models.TestInfoSevenValue,
                    as: 'TestInfoSevenjoint'
                }]
            });
            dynamicKey = 'TestInfoSevenjoint';
            break;
        case 'Test-Info-Eight':
            infoMappings = await models.TestInfoEight.findOne({
                where: { testId: testid },
                include: [{
                    model: models.TestInfoEightValue,
                    as: 'TestInfoEightjoint'
                }]
            });
            dynamicKey = 'TestInfoEightjoint';
            break;
        case 'Test-Info-Nine':
            infoMappings = await models.TestInfoNine.findOne({
                where: { testId: testid },
                include: [{
                    model: models.TestInfoNineValue,
                    as: 'TestInfoNinejoint'
                }]
            });
            dynamicKey = 'TestInfoNinejoint';
            break;
        case 'Test-Info-Ten':
            infoMappings = await models.TestInfoTen.findOne({
                where: { testId: testid },
                include: [{
                    model: models.TestInfoTenValue,
                    as: 'TestInfoTenjoint'
                }]
            });
            dynamicKey = 'TestInfoTenjoint';
            break;
        case 'Test-Info-Eleven':
            infoMappings = await models.TestInfoEleven.findOne({
                where: { testId: testid },
                include: [{
                    model: models.TestInfoElevenValue,
                    as: 'TestInfoElevenjoint'
                }]
            });
            dynamicKey = 'TestInfoElevenjoint';
            break;
        case 'Test-Info-Twelve':
            infoMappings = await models.TestInfoTwelve.findOne({
                where: { testId: testid },
                include: [{
                    model: models.TestInfoTwelveValue,
                    as: 'TestInfoTwelvejoint'
                }]
            });
            dynamicKey = 'TestInfoTwelvejoint';
            break;
        default:
            throw new Error('Unsupported template type');
    }

    if (!infoMappings) {
        throw new Error(`No data found for testId: ${testid} and infoType: ${infoType}`);
    }

    const jointInfoData = infoMappings[dynamicKey][0];
    if (!jointInfoData) {
        throw new Error('No joint data found');
    }

    return { infoMappings, jointInfoData };
};

const processinfoMappings = (infoMappings, jointInfoData) => {
    const infoFormData = {};
    const fieldMappingsData = infoMappings.dataValues;

    Object.keys(fieldMappingsData).forEach((key) => {
        if (key.startsWith("Info")) {
            const headerName = fieldMappingsData[key];
            const logicalKey = `ValueOf${key}`; // For example, "ValueOfHeaderOne"
            infoFormData[headerName] = jointInfoData.dataValues[logicalKey] || '';
        }
    });

    return infoFormData;
};

module.exports = { getInfoData, processinfoMappings };