module.exports = (sequelize, DataTypes) => {

    const DuctilityofBitumen2 = sequelize.define('DuctilityofBitumen2', {
        Ductility: {
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

    return { DuctilityofBitumen2 };
}