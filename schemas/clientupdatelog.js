module.exports = (sequelize, DataTypes) => {

    const UpdateLog = sequelize.define('UpdateLog', {
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Clients', // Client table
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // User table
                key: 'id'
            }
        },
        changes: {
            type: DataTypes.TEXT, // Store changes as a JSON string
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    return UpdateLog;
}