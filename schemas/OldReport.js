module.exports = (sequelize, DataTypes) => {
    const Oldreport = sequelize.define("Oldreport", {
        labjobno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        labjobId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'LabJobs',
                key: "id"
            }
        },
        urlno: {
            type: DataTypes.STRING,
            allowNull: true
        },
        issuedate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        reportformateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Masterofreportformates",
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        timestamps: true, // Enable timestamps
        updatedAt: false, // Exclude updatedAt
    })

    const Oldreportextanote = sequelize.define("Oldreportextanote", {
        extranotes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oldreportId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Oldreports',
                key: "id"
            }
        }
    })

    return { Oldreport, Oldreportextanote }
}