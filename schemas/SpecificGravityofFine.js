module.exports = (sequelize, DataTypes) => {
    const SpecificGravityofFine1 = sequelize.define("SpecificGravityofFine1", {
        SampleTested: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MeanofSpecificgravity: {
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
    }, {
        timestamps: false
    })

    const SpecificGravityofFine2 = sequelize.define('SpecificGravityofFine2', {
        W1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        W2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        W3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        W4: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ovendriedspecificgravity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specificgravity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SpecificGravityofFine1Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SpecificGravityofFine1s',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { SpecificGravityofFine1, SpecificGravityofFine2 }
}