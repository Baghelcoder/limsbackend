module.exports = (sequelize, DataTypes) => {
    const AsphaltcontentofBituminous2 = sequelize.define('AsphaltcontentofBituminous2', {
        furnacetemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sampleweight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        finalweight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weightloss: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weightlosspersent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        asphaltcontent: {
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

    return AsphaltcontentofBituminous2;
}