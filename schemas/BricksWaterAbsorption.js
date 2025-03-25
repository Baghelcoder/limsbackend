module.exports = (sequelize, DataTypes) => {

    const BricksWaterAbsorption1 = sequelize.define('BricksWaterAbsorption1', {
        SampleTested: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        ovendrytemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        immersiontemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timeimmersionwater: {
            type: DataTypes.DATE,
            allowNull: false
        },
        timeremovalwater: {
            type: DataTypes.DATE,
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
    const BricksWaterAbsorption2 = sequelize.define("BricksWaterAbsorption2", {
        M1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        M2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        waterabsorption: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BricksWaterAbsorption1Id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'BricksWaterAbsorption1s',
                key: "id"
            }
        }
    })

    return { BricksWaterAbsorption1, BricksWaterAbsorption2 }
}