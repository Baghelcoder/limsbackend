module.exports = (sequelize, DataTypes) => {
    const StrippingValueofCoarse2 = sequelize.define('StrippingValueofCoarse2', {
        sampleweight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bitumenweight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalaggregate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uncoveredaggregate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        strippingvalue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CommonschemaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Commonschemas',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return StrippingValueofCoarse2;
}