module.exports = (sequelize, DataTypes) => {

    const Sevenentrytemplate = sequelize.define('Sevenentrytemplate', {
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

    const Valueofsevenentrytemplate = sequelize.define("Valueofsevenentrytemplate", {
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
        SevenentrytemplateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Sevenentrytemplates',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { Sevenentrytemplate, Valueofsevenentrytemplate }
}