const testTypeMapping = {
    'BricksWAb': { products: ['Bricks'], tests: ['Water Absorption'] },
    'BricksStrength': { products: ['Bricks'], tests: ['Compressive Strength'] },
    'BricksEfflorescence': { products: ['Bricks'], tests: ['Efflorescence'] },
    'BricksBulkDensity': { products: ["Bricks"], tests: ["BULK DENSITY"] },
    'DimensionofBricks': { products: ["Bricks"], tests: ["Dimension"] },
    'CementDensity': { products: ['Cement'], tests: ['Density'] },
    'CementFinenessbyDrySieveMethod': { products: ["Cement"], tests: ["Fineness (by Dry Sieve Method)"] },
    'CementSoundnessbyLeChatelier': { products: ["Cement"], tests: ["Soundness (by Le-Chatelier)"] },
    'ConcreteTensileStrength': { products: ['Concrete'], tests: ['Tensile Strength'] },
    'NewTestType': { products: ['NewProduct'], tests: ['New Test'] },
    // Add more mappings as needed
};

const determineTestType = (productName, testName) => {
    if (!productName || !testName) {
        console.error('Product name or test name is undefined');
        return null; // Return null if either value is undefined
    }

    for (const [testType, { products, tests }] of Object.entries(testTypeMapping)) {
        if (products.some(keyword => productName.includes(keyword)) &&
            tests.some(test => testName.includes(test))) {
            return testType;
        }
    }
    return null; // Return null if no matching test type is found
};


module.exports = determineTestType;