module.exports = (sequelize, DataTypes) => {
    const MaterialfinerofFine1 = sequelize.define("MaterialfinerofFine1", {
        SampleTested: {
            type: DataTypes.DATEONLY,
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
    }, {
        timestamps: false
    })


    const MaterialfinerofFine2 = sequelize.define('MaterialfinerofFine2', {
        sievesize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sampleweight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weightafterdry: {
            type: DataTypes.STRING,
            allowNull: false
        },
        materialfiner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MaterialfinerofFine1Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'MaterialfinerofFine1s',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { MaterialfinerofFine1, MaterialfinerofFine2 }
}