module.exports = (sequelize, DataTypes) => {

    const Masterofreportformate = sequelize.define("Masterofreportformate", {
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        reportformateno: {
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
    return Masterofreportformate

}