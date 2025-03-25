module.exports = (sequelize, DataTypes) => {
    const CementSoundnessByLeChatelierMethod1 = sequelize.define('CementSoundnessByLeChatelierMethod1', {
        SampleTested: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        roomtemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roomhumidity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cementweight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        waterweight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Mean: {
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
    const CementSoundnessByLeChatelierMethod2 = sequelize.define("CementSoundnessByLeChatelierMethod2", {
        D1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        D2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        D: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CementSoundnessByLeChatelierMethod1Id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'CementSoundnessByLeChatelierMethod1s',
                key: 'id'
            }
        }

    })
    return { CementSoundnessByLeChatelierMethod1, CementSoundnessByLeChatelierMethod2 }
}