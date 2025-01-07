module.exports = (sequelize, DataTypes) => {

    const Fiveentrytemplate = sequelize.define('Fiveentrytemplate', {
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

    const Valueoffiveentrytemplate = sequelize.define("Valueoffiveentrytemplate", {
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
        FiveentrytemplateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Fiveentrytemplates',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })
    return { Fiveentrytemplate, Valueoffiveentrytemplate }

}