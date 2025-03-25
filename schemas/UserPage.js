module.exports = (sequelize, DataTypes) => {
    const UserPage = sequelize.define('UserPageaccess', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            },
        },
    }, {
        timestamps: false
    });
    const ProductTestacc = sequelize.define('ProductTestaccess', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        UserPageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'UserPageaccesses',
                key: 'id'
            },
        },
        TestDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TestDetails',
                key: 'id'
            },
        },
    }, {
        timestamps: false
    });

    return { UserPage, ProductTestacc }

};