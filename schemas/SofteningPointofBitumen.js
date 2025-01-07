module.exports = (sequelize, DataTypes) => {
    const SofteningPointofBitumen2 = sequelize.define('SofteningPointofBitumen2', {
        softeningpoint: {
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

    return { SofteningPointofBitumen2 }
}