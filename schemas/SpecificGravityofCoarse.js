module.exports = (sequelize, DataTypes) => {
    const SpecificGravityofCoarse1 = sequelize.define("SpecificGravityofCoarse1", {
        SampleTested: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        DescriptionofSample: {
            type: DataTypes.STRING,
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

    const SpecificGravityofCoarse2 = sequelize.define('SpecificGravityofCoarse2', {
        A1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        A2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        A: {
            type: DataTypes.STRING,
            allowNull: false
        },
        B: {
            type: DataTypes.STRING,
            allowNull: false
        },
        C: {
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
        SpecificGravityofCoarse1Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SpecificGravityofCoarse1s',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { SpecificGravityofCoarse1, SpecificGravityofCoarse2 }
}