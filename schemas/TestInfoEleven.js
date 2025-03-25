module.exports = (sequelize, DataTypes) => {
    const TestInfoEleven = sequelize.define("TestInfoEleven", {
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
        InfoSeven: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InfoEight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InfoNine: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InfoTen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InfoEleven: {
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

    const TestInfoElevenValue = sequelize.define("TestInfoElevenValue", {
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
        ValueOfInfoSeven: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfInfoEight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfInfoNine: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfInfoTen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfInfoEleven: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TestInfoElevenId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TestInfoElevens',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { TestInfoEleven, TestInfoElevenValue }
}