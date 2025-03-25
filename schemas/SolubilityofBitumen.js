module.exports = (sequelize, DataTypes) => {
    const SolubilityofBitumen2 = sequelize.define('SolubilityofBitumen2', {
        W1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        W2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        W3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        W4: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trichloroethylene: {
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

    return { SolubilityofBitumen2 }
}