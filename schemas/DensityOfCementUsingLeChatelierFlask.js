module.exports = (sequelize, DataTypes) => {

    const DensityOfCementUsingLeChatelierFlask1 = sequelize.define('DensityOfCementUsingLeChatelierFlask1', {
        SampleTested: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        kerosenedensity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roomtemp: {
            type: DataTypes.STRING,
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
                model: "LabJobs",
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
    const DensityOfCementUsingLeChatelierFlask2 = sequelize.define('DensityOfCementUsingLeChatelierFlask2', {
        a: {
            type: DataTypes.STRING,
            allowNull: false
        },
        b: {
            type: DataTypes.STRING,
            allowNull: false
        },
        c: {
            type: DataTypes.STRING,
            allowNull: false
        },
        d: {
            type: DataTypes.STRING,
            allowNull: false
        },
        density: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DensityOfCementUsingLeChatelierFlask1Id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'DensityOfCementUsingLeChatelierFlask1s',
                key: "id"
            }
        }

    })

    return { DensityOfCementUsingLeChatelierFlask1, DensityOfCementUsingLeChatelierFlask2 };
}