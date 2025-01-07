module.exports = (sequelize, DataTypes) => {
    const Commonschema = sequelize.define('Commonschema', {
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

    return Commonschema;
}