module.exports = (sequelize, DataTypes) => {
    const SpecificGravityofBitumen2 = sequelize.define('SpecificGravityofBitumen2', {
        a: {
            type: DataTypes.STRING,
            allowNull: false
        },
        b: {
            type: DataTypes.STRING,
            allowNull: false
        },
        c: {
            type: DataTypes.STRING,
            allowNull: false
        },
        d: {
            type: DataTypes.STRING,
            allowNull: false
        },
        G: {
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
    return { SpecificGravityofBitumen2 }

}