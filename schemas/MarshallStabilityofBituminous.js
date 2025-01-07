module.exports = (sequelize, DataTypes) => {
    const MarshallStabilityofbituminous1 = sequelize.define("MarshallStabilityofbituminous1", {
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
        StabilityMean: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FlowMean: {
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


    const MarshallStabilityofbituminous2 = sequelize.define('MarshallStabilityofbituminous2', {
        bindercontent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specimenno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        measuredstability: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correctionfactor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stabilityaftercorrection: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flowvalue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MarshallStabilityofbituminous1Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'MarshallStabilityofbituminous1s',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { MarshallStabilityofbituminous1, MarshallStabilityofbituminous2 }
}