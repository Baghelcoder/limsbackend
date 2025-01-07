module.exports = (sequelize, DataTypes) => {
    const AbsoluteViscosityofBitumen2 = sequelize.define('AbsoluteViscosityofBitumen2', {
        Descriptionoftube: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CalibrationFactor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TestTemperature: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Flowtime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Viscosity: {
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

    return AbsoluteViscosityofBitumen2;
}