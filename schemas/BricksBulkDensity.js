module.exports = (sequelize, DataTypes) => {

    const BricksBulkDensity2 = sequelize.define("BricksBulkDensity2", {
        mark: {
            type: DataTypes.STRING,
            allowNull: false
        },
        length: {
            type: DataTypes.STRING,
            allowNull: false
        },
        width: {
            type: DataTypes.STRING,
            allowNull: false
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        volume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Density: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CommonschemaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Commonschemas',
                key: 'id'
            }
        }

    })


    return { BricksBulkDensity2 }

}