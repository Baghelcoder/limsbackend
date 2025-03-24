module.exports = (sequelize, DataTypes) => {
    const AshContentofAdmixture2 = sequelize.define('AshContentofAdmixture2', {
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
        ashcontent: {
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

    return AshContentofAdmixture2;
}