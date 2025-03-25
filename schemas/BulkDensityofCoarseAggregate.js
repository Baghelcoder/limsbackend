module.exports = (sequelize, DataTypes) => {
    const BulkDensityofCoarseAggregate2 = sequelize.define('BulkDensityofCoarseAggregate2', {
        A: {
            type: DataTypes.STRING,
            allowNull: false
        },
        B: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bulkdensity: {
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

    return { BulkDensityofCoarseAggregate2 }

}