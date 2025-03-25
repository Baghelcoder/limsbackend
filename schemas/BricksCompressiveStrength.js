module.exports = (sequelize, DataTypes) => {
    const BrickCompressiveStrength1 = sequelize.define('BrickCompressiveStrength1', {
        SampleTested: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        timeofimmersionaftergrinding: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        timeofremovalwater: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        timeoffrogfilling: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        timestorejutebagsfrog: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        timeremovaljutebags: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        roomtemp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timeimmersionwater: {
            type: DataTypes.DATE,
            allowNull: false,
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
    }, {
        timestamps: false
    });
    const BrickCompressiveStrength2 = sequelize.define("BrickCompressiveStrength2", {
        BrickCompressiveStrength1Id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'BrickCompressiveStrength1s',
                key: 'id'
            }
        },
        idmark: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        length: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        breadth: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        badfacearea: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        maxload: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        compressivestrength: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return { BrickCompressiveStrength1, BrickCompressiveStrength2 }
}