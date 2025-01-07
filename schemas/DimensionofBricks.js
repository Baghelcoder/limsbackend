module.exports = (sequelize, DataTypes) => {
    const DimensionofBricks1 = sequelize.define("DimensionofBricks1", {
        sampleTestedDateFrom: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        sampleTestedDateTo: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        averageofaveragelength: {
            type: DataTypes.STRING,
            allowNull: false
        },
        averageofaveragewidth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        averageofaverageheigth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        labJobId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'LabJobs',
                key: 'id'
            },
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
    const DimensionofBricks2 = sequelize.define('DimensionofBricks2', {
        lengthface1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lengthface2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        averagelength: {
            type: DataTypes.STRING,
            allowNull: false
        },
        widthface1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        widthface2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        averagewidth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heigthface1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heigthface2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        averageheigth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DimensionofBricks1Id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'DimensionofBricks1s',
                key: 'id'
            }
        }

    })

    return { DimensionofBricks1, DimensionofBricks2 };
}