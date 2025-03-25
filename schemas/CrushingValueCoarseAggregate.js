module.exports = (sequelize, DataTypes) => {

    const CrushingValueCoarseAggregate2 = sequelize.define('CrushingValueCoarseAggregate2', {
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
        Crushingvalue: {
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

    return { CrushingValueCoarseAggregate2 }
}