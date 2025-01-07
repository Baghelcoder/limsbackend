module.exports = (sequelize, DataTypes) => {
    const Eightentrytemplate = sequelize.define('Eightentrytemplate', {
        HeaderOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HeaderTwo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HeaderThree: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HeaderFour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HeaderFive: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HeaderSix: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HeaderSeven: {
            type: DataTypes.STRING,
            allowNull: false
        },
        HeaderEight: {
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
    }, {
        timestamps: false
    })

    const Valueofeightentrytemplate = sequelize.define("Valueofeightentrytemplate", {
        ValueOfHeaderOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfHeaderTwo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfHeaderThree: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfHeaderFour: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfHeaderFive: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfHeaderSix: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfHeaderSeven: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueOfHeaderEight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EightentrytemplateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Eightentrytemplates',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { Eightentrytemplate, Valueofeightentrytemplate }
}