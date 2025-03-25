module.exports = (sequelize, DataTypes) => {
    const PenetrationofBitumen2 = sequelize.define('PenetrationofBitumen2', {
        penetration: {
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

    return { PenetrationofBitumen2 }

}