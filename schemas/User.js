module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'users_username_unique'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'client', 'user'),
            allowNull: false
        },
        accessfor: {
            type: DataTypes.ENUM('All', 'Registration', 'DataEntry', 'Print', 'null'),
            allowNull: false
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        Active: {
            type: DataTypes.ENUM('true', 'false'),
            allowNull: false
        },
        CanEdit: {
            type: DataTypes.ENUM("true", 'false'),
            allowNull: false
        },
        CanDelete: {
            type: DataTypes.ENUM("true", 'false'),
            allowNull: false
        }
    }, {
        timestamps: false,
        indexes: [{
            unique: true,
            fields: ['username'],
            name: 'username'
        }]
    });
    return User
}