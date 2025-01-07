module.exports = (sequelize, DataTypes) => {
    const Threeentrytemplate = sequelize.define('Threeentrytemplate', {
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

    const Valueofthreeentrytemplate = sequelize.define("Valueofthreeentrytemplate", {
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
        ThreeentrytemplateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Threeentrytemplates',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { Threeentrytemplate, Valueofthreeentrytemplate }

}