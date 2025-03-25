module.exports = (sequelize, DataTypes) => {
    const Masterlistofrecord = sequelize.define("Masterlistofrecord", {
        testId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'TestDetails',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        datasheetformateno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        issueno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        revno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        revdate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    })

    return Masterlistofrecord
}