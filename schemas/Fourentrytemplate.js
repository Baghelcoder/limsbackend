module.exports = (sequelize, DataTypes) => {

    const Fourentrytemplate = sequelize.define('Fourentrytemplate', {
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

    const Valueoffourentrytemplate = sequelize.define("Valueoffourentrytemplate", {
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
        FourentrytemplateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Fourentrytemplates',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })
    return { Fourentrytemplate, Valueoffourentrytemplate }


}