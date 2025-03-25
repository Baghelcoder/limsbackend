module.exports = (sequelize, DataTypes) => {
    const ElasticRecoveryofBitumen2 = sequelize.define('ElasticRecoveryofBitumen2', {
        combinedspecimen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        elasticrecovery: {
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
    return { ElasticRecoveryofBitumen2 }
}