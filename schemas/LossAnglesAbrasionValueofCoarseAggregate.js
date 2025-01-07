module.exports = (sequelize, DataTypes) => {
    const LossAnglesofCoarseAggregate2 = sequelize.define('LossAnglesofCoarseAggregate2', {
        A: {
            type: DataTypes.STRING,
            allowNull: false
        },
        B: {
            type: DataTypes.STRING,
            allowNull: false
        },
        abrasionvalue: {
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

    return { LossAnglesofCoarseAggregate2 }

}