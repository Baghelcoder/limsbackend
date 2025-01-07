module.exports = (sequelize, DataTypes) => {
    const FlashPointofBitumen1 = sequelize.define("FlashPointofBitumen1", {
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


    const FlashPointofBitumen2 = sequelize.define('FlashPointofBitumen2', {
        flashpoint: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firepoint: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FlashPointofBitumen1Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'FlashPointofBitumen1s',
                key: 'id'
            }
        }
    }, {
        timestamps: false
    })

    return { FlashPointofBitumen1, FlashPointofBitumen2 }
}