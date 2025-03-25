module.exports = (sequelize, DataTypes) => {
    const ErrorLog = sequelize.define('ErrorLog', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        stack_trace: {
            type: DataTypes.TEXT,
        },
        additional_info: {
            type: DataTypes.JSON,
        },
    }, {
        timestamps: false,
    });

    return { ErrorLog };
}