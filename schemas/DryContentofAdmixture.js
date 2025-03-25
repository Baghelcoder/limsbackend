module.exports = (sequelize, DataTypes) => {
    const DryContentofAdmixture2 = sequelize.define('DryContentofAdmixture2', {
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
        drycontent: {
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

    return DryContentofAdmixture2;
}