module.exports = (sequelize, DataTypes) => {
    const TestInfoSix = sequelize.define("TestInfoSix", {
        InfoOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InfoTwo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InfoThree: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InfoFour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InfoFive: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InfoSix: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        testId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'TestDetails',
                key: 'id'
            }
        },
        NameofTest: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MethodofTest: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        timestamps: false
    })

    const TestInfoSixValue = sequelize.define("TestInfoSixValue", {
        ValueOfInfoOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfInfoTwo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfInfoThree: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfInfoFour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfInfoFive: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfInfoSix: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TestInfoSixId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TestInfoSixes',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { TestInfoSix, TestInfoSixValue }
}