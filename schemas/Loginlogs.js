module.exports = (sequelize, DataTypes) => {
    const LoginLog = sequelize.define('LoginLog', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        loginTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        logoutTime: {
            type: DataTypes.DATE,
            allowNull: true // Initially, this will be null until the user logs out
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userTimezone: {
            type: DataTypes.STRING, // Example: 'America/New_York', 'Europe/London'
            allowNull: true, // or true, depending on your requirements
        },
    }, {
        timestamps: false
    });

    return LoginLog
}