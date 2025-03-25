module.exports = (sequelize, DataTypes) => {
    const CementbyDrySieving1 = sequelize.define("CementbyDrySieving1", {
        SampleTested: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        Mean: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        labJobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'LabJobs',
                key: 'id'
            }
        },
        testId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'TestDetails',
                key: 'id'
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: "id"
            }
        }
    })
    const CementbyDrySieving2 = sequelize.define("CementbyDrySieving2", {
        W1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        W2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        R: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CementbyDrySieving1Id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'CementbyDrySieving1s',
                key: 'id'
            }
        }

    })

    return { CementbyDrySieving1, CementbyDrySieving2 }
}