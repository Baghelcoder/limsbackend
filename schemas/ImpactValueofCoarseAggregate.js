module.exports = (sequelize, DataTypes) => {

    const ImpactValueofCoarseAggregate2 = sequelize.define('ImpactValueofCoarseAggregate2', {
        A: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weightretained: {
            type: DataTypes.STRING,
            allowNull: false
        },
        B: {
            type: DataTypes.STRING,
            allowNull: false
        },
        impactvalue: {
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

    return { ImpactValueofCoarseAggregate2 }
}