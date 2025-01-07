const fieldMapping = {
    'Bituminous Mix/Core': {
        'Marshall Stability': ['StabilityMean', 'FlowMean'],
    },
    'Coarse Aggregate': {
        'Specific Gravity': ['MeanofSpecificgravity', 'Mean']
    },
    'Fine Aggregate': {
        "Specific Gravity": ['MeanofSpecificgravity', 'Mean']
    },
    'Bricks': {
        'Compressive Strength': ['timeofimmersionaftergrinding', 'timeofremovalwater', 'roomtemp', 'timeoffrogfilling', 'timestorejutebagsfrog', 'timeremovaljutebags', 'timeimmersionwater', 'Mean'],
        'Water Absorption': ['ovendrytemp', 'immersiontemp', 'timeimmersionwater', 'timeremovalwater', 'Mean'],
        'Efflorescence': ['roomtemp']
    },
    'Cement': {
        'Fineness (by Dry Sieve Method)': ['Mean'],
        'Soundness (by Le-Chatelier)': ['roomtemp', 'roomhumidity', 'cementweight', 'waterweight', 'Mean'],
        'Density': ['roomtemp', 'kerosenedensity', 'Mean']
    }
};

function applyConditionalFields(productName, testName, responseData, data, alias2) {
    const productmap = fieldMapping[productName]
        // Check if productmap exists
    if (productmap) {
        const mappings = productmap[testName];

        // Check if mappings exist
        if (mappings) {
            mappings.forEach(field => {
                responseData[field] = (data[alias2] && data[alias2][0] && data[alias2][0][field]) || null;
            });
        }
    }

    // Always set Mean, even if mappings don't exist
    responseData.Mean = (data[alias2] && data[alias2][0] && data[alias2][0].Mean) || null;
}

module.exports = applyConditionalFields;