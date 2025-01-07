module.exports = (sequelize, DataTypes) => {
    const LabJob = sequelize.define('LabJob', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        labJobNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sampleCodeNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        MaterialDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MaterialBrand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ProductId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        signwith: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Staffofcompanies',
                key: 'id'
            }
        },
        verifiedby: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Staffofcompanies',
                key: "id"
            }
        },
        AuthorisedSignatory: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Staffofcompanies',
                key: 'id'
            }
        },
        isTestfilled: {
            type: DataTypes.ENUM("false", 'true'),
            allowNull: false
        },
        SampleQty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customerOrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CustomerOrders',
                key: 'id'
            },
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        timestamps: true, // Enable timestamps
        updatedAt: false, // Exclude updatedAt
    });

    const TestofLabJob = sequelize.define("TestofLabJob", {
        id: {
            type: DataTypes.INTEGER, // Use BIGINT for larger ranges
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        LabJobId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'LabJobs',
                key: 'id'
            }
        },
        Testid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'TestDetails',
                key: "id"
            }
        },
        Status: {
            type: DataTypes.ENUM("false", 'true'),
            allowNull: false
        }
    })

    return { LabJob, TestofLabJob }
}