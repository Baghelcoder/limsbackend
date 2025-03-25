module.exports = (sequelize, DataTypes) => {

    const Staffofcompany = sequelize.define("Staffofcompany", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Qualification: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DateOfJoining: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        YearOfExp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SignAuthority: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ScanSign: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: "id"
            }
        },
        Status: {
            type: DataTypes.ENUM("Active", 'Deactivate'),
            allowNull: false
        }
    })

    const Staffauthrizedtest = sequelize.define("Staffauthrizedtest", {
        ProductsId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        StaffofcompanyId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'staffofcompanies',
                key: 'id'
            }
        }
    })

    return { Staffofcompany, Staffauthrizedtest }

}