module.exports = (sequelize, DataTypes) => {

    const PhValueofAdmixture1 = sequelize.define('PhValueofAdmixture1', {
        SampleTested: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        labtemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        samplevalue: {
            type: DataTypes.STRING,
            allowNull: false
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
                model: "LabJobs",
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
    const PhValueofAdmixture2 = sequelize.define('PhValueofAdmixture2', {
        phvalue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true
        },
        PhValueofAdmixture1Id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'PhValueofAdmixture1s',
                key: "id"
            }
        }

    })

    return { PhValueofAdmixture1, PhValueofAdmixture2 };
}