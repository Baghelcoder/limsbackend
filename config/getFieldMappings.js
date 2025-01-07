// getFieldMappings.js
const { models } = require('./db');


const getTemplateData = async(testid, templateType) => {
    let fieldMappings = null;
    let dynamicKey = '';

    // Select the schema based on the templateType (Five, Six, Seven, etc.)
    switch (templateType) {
        case 'two-entry-template-header':
            fieldMappings = await models.Twoentrytemplate.findOne({
                where: { testId: testid },
                include: [{
                    model: models.Valueoftwoentrytemplate,
                    as: 'Twoentrytemplatejoint',
                }],
            });
            dynamicKey = 'Twoentrytemplatejoint';
            break;
        case 'three-entry-template-header':
            fieldMappings = await models.Threeentrytemplate.findOne({
                where: { testId: testid },
                include: [{
                    model: models.Valueofthreeentrytemplate,
                    as: 'Threeentrytemplatejoint',
                }],
            });
            dynamicKey = 'Threeentrytemplatejoint';
            break;
        case 'four-entry-template-header':
            fieldMappings = await models.Fourentrytemplate.findOne({
                where: { testId: testid },
                include: [{
                    model: models.Valueoffourentrytemplate,
                    as: 'Fourentrytemplatejoint',
                }],
            });
            dynamicKey = 'Fourentrytemplatejoint';
            break;
        case 'five-entry-template-header':
            fieldMappings = await models.Fiveentrytemplate.findOne({
                where: { testId: testid },
                include: [{
                    model: models.Valueoffiveentrytemplate,
                    as: 'Fiveentrytemplatejoint',
                }],
            });
            dynamicKey = 'Fiveentrytemplatejoint';
            break;
        case 'six-entry-template-header':
            fieldMappings = await models.Sixentrytemplate.findOne({
                where: { testId: testid },
                include: [{
                    model: models.Valueofsixentrytemplate,
                    as: 'Sixentrytemplatejoint',
                }],
            });
            dynamicKey = 'Sixentrytemplatejoint';
            break;
        case 'seven-entry-template-header':
            fieldMappings = await models.Sevenentrytemplate.findOne({
                where: { testId: testid },
                include: [{
                    model: models.Valueofsevenentrytemplate,
                    as: 'Sevenentrytemplatejoint',
                }],
            });
            dynamicKey = 'Sevenentrytemplatejoint';
            break;
        case 'eight-entry-template-header':
            fieldMappings = await models.Eightentrytemplate.findOne({
                where: { testId: testid },
                include: [{
                    model: models.Valueofeightentrytemplate,
                    as: 'Eightentrytemplatejoint',
                }],
            });
            dynamicKey = 'Eightentrytemplatejoint';
            break;
        case 'nine-entry-template-header':
            fieldMappings = await models.Nineentrytemplate.findOne({
                where: { testId: testid },
                include: [{
                    model: models.Valueofnineentrytemplate,
                    as: 'Nineentrytemplatejoint',
                }],
            });
            dynamicKey = 'Nineentrytemplatejoint';
            break;
        default:
            throw new Error('Unsupported template type');
    }

    if (!fieldMappings) {
        throw new Error('No field mappings found');
    }

    const jointData = fieldMappings[dynamicKey][0];
    if (!jointData) {
        throw new Error('No joint data found');
    }

    return { fieldMappings, jointData };
};

const processFieldMappings = (fieldMappings, jointData) => {
    const initialFormData = {};
    const fieldMappingsData = fieldMappings.dataValues;

    Object.keys(fieldMappingsData).forEach((key) => {
        if (key.startsWith("Header")) {
            const headerName = fieldMappingsData[key];
            if (!headerName.includes("Average")) { // Exclude headers containing "Average"
                const logicalKey = `ValueOf${key}`; // For example, "ValueOfHeaderOne"
                initialFormData[headerName] = jointData.dataValues[logicalKey] || '';
            }
        }
    });
    return initialFormData;
};

module.exports = { getTemplateData, processFieldMappings };