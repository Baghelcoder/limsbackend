// dynamicAssociations.js
const { Sequelize } = require('sequelize');
const { models } = require('./db');
const schemasConfig = require("./schemasConfig");
const aliasTracker = new Set();

function defineAssociations(schemaName) {
    const { model1, model2 } = schemasConfig[schemaName];
    const SchemaModel1 = models[model1.model];
    const SchemaModel2 = models[model2.model];
    const alias1 = model2.Userjointkey || null;
    const alias3 = model2.testjointkey || null;
    const parentKey = model2.parentKey || 'CommonschemaId';
    if (!parentKey) {
        console.warn(`parentKey is not defined for schema: ${schemaName}`);
    }

    let alias2 = model2.labjointkey || null;
    let counter = 1;
    const baseAlias = alias2;

    // Check globally for duplicate alias
    while (SchemaModel1.associations[alias2] || aliasTracker.has(alias2)) {
        alias2 = `${baseAlias}_${counter}`; // Reassignment is allowed with let
        counter++;
    }
    aliasTracker.add(alias2); // Track globally

    if (model2.relation === 'child') {
        if (alias1 && !SchemaModel1.associations[alias1]) {
            SchemaModel1.belongsTo(models.User, { foreignKey: model1.UserId, as: alias1 });
            models.User.hasMany(SchemaModel1, { foreignKey: model1.UserId });
        }
        if (alias2 && !SchemaModel1.associations[alias2]) {
            SchemaModel1.belongsTo(models.LabJob, { foreignKey: model1.labjobid });
            models.LabJob.hasMany(SchemaModel1, { foreignKey: model1.labjobid, as: alias2 });
        }
        if (alias3 && !SchemaModel1.associations[alias3]) {
            SchemaModel1.belongsTo(models.TestDetails, { foreignKey: model1.testid, as: alias3 });
            models.TestDetails.hasMany(SchemaModel1, { foreignKey: model1.testid });
        }
        if (parentKey && SchemaModel2) {
            if (parentKey && !SchemaModel1.associations[model2.jointkey]) {
                SchemaModel1.hasMany(SchemaModel2, {
                    foreignKey: parentKey,
                    as: model2.jointkey,
                    scope: {
                        id: {
                            [Sequelize.Op.not]: null
                        }
                    } // Prevent empty associations
                });
                SchemaModel2.belongsTo(SchemaModel1, { foreignKey: parentKey });
            }
        }
    }
    return alias2;

}
module.exports = defineAssociations;