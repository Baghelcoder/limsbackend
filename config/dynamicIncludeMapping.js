// dynamicIncludeMapping.js
const { models } = require('../config/db');
module.exports = function getDynamicInclude(productname, testName, model2, alias3, parentKey) {
    const SchemaModel2 = models[model2.model];
    const includeArray = [
        { model: models.TestDetails, as: alias3, attributes: ['TestName', 'TestMethod'] }
    ];

    const includeConfig = {
        'Bitumen': {
            'Flash Point': [{ model: SchemaModel2, as: parentKey }],
            'Test2': [{ model: SchemaModel2, as: parentKey }]
        },
        'Coarse Aggregate': {
            'Material finer than 75 µ': [{ model: SchemaModel2, as: parentKey }]
        },
        'Bricks': {
            'Compressive Strength': [{ model: SchemaModel2, as: parentKey }],
            'Efflorescence': [{ model: SchemaModel2, as: parentKey }]
        },
        'Fine Aggregate': {
            'Material finer than 75 µ': [{ model: SchemaModel2, as: parentKey }]
        }
    };
    const testNamesArray = Array.isArray(testName) ? testName : [testName];

    // Check if the product has specific test mappings
    if (includeConfig[productname]) {
        // Filter tests that exist in the config
        testNamesArray.forEach(testName => {
            if (includeConfig[productname][testName]) {
                includeConfig[productname][testName].forEach(item => {
                    if (item.model && item.model.getTableName) {
                        includeArray.push(item);
                    } else {
                        console.error(`Model not initialized for test: ${testName}, product: ${productname}`);
                    }
                });
            }
        });
    }

    return includeArray;
};