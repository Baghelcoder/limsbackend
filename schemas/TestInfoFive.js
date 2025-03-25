module.exports = (sequelize, DataTypes) => {
    const TestInfoFive = sequelize.define("TestInfoFive", {
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

    const TestInfoFiveValue = sequelize.define("TestInfoFiveValue", {
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
        TestInfoFiveId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TestInfoFives',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })
    return { TestInfoFive, TestInfoFiveValue }

}