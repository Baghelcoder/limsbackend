module.exports = (sequelize, DataTypes) => {
    const WaterAbsorptionofCoarse2 = sequelize.define('WaterAbsorptionofCoarse2', {
        A1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        A2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        A: {
            type: DataTypes.STRING,
            allowNull: false
        },
        B: {
            type: DataTypes.STRING,
            allowNull: false
        },
        C: {
            type: DataTypes.STRING,
            allowNull: false
        },
        waterabsorption: {
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

    return WaterAbsorptionofCoarse2;
}