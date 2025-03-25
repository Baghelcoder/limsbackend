module.exports = (sequelize, DataTypes) => {
    const EfflorescenceofBricks1 = sequelize.define("EfflorescenceofBricks1", {
        SampleTested: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        roomtemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        labJobId: {
            type: DataTypes.INTEGER,
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
    const EfflorescenceofBricks2 = sequelize.define('EfflorescenceofBricks2', {
        brickmark: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Efflorescence: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EfflorescenceofBricks1Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'EfflorescenceofBricks1s',
                key: 'id'
            }
        }

    })
    return { EfflorescenceofBricks1, EfflorescenceofBricks2 }

}