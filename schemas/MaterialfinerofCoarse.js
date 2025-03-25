module.exports = (sequelize, DataTypes) => {
    const MaterialfinerofCoarse1 = sequelize.define("MaterialfinerofCoarse1", {
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


    const MaterialfinerofCoarse2 = sequelize.define('MaterialfinerofCoarse2', {
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
        MaterialfinerofCoarse1Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'MaterialfinerofCoarse1s',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { MaterialfinerofCoarse1, MaterialfinerofCoarse2 }
}