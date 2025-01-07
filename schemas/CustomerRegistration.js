module.exports = (sequelize, DataTypes) => {

    const CustomerRegistration = sequelize.define('CustomerRegistration', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        CustName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false
        },
        State: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Pin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhoneNo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        GSTNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ContactPersonName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        timestamps: true, // Enable timestamps
        updatedAt: false, // Exclude updatedAt
    });
    return CustomerRegistration;
}