module.exports = (sequelize, DataTypes) => {
    const ChlorideContentofAdmixture2 = sequelize.define('ChlorideContentofAdmixture2', {
        samplevolume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ammoniumvolume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nitratevolume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chloridecontent: {
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

    return ChlorideContentofAdmixture2;
}