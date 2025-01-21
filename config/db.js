const { Sequelize, DataTypes } = require('sequelize');
require("dotenv").config();
const path = require('path');
const fs = require('fs')

const sequelize = new Sequelize(process.env.db_name, process.env.db_username, process.env.db_password, {
    host: process.env.db_host,
    dialect: 'mysql',
    logging: false,
    waitForConnections: true,
    timezone: '+05:30'
});

// Read all files in the models directory and import them dynamically
const models = {};
const modelsDir = path.join(__dirname, '../schemas');

// Dynamically import all model files
fs.readdirSync(modelsDir)
    .filter((file) => file.endsWith('.js') && file !== 'associate.js') // exclude index.js file
    .forEach((file) => {
        const schema = require(path.join(modelsDir, file))(sequelize, DataTypes);

        if (schema.prototype instanceof Sequelize.Model) {
            models[schema.name] = schema;
        } else if (typeof schema === 'object') {
            Object.keys(schema).forEach(modelName => {
                if (schema[modelName].prototype instanceof Sequelize.Model) {
                    models[modelName] = schema[modelName];
                }
            });
        }
    });
// Set up associations after models are loaded
const associate = require('../schemas/associate');
associate(models);

// Sync all models with the database{ alter: true }
sequelize.sync({alert:true})
    .then(() => console.log("Database synced successfully"))
    .catch(err => console.error("Failed to sync database:", err));

module.exports = { sequelize, models };
