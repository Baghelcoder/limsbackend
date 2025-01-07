module.exports = (sequelize, DataTypes) => {
    const CustomerOrder = sequelize.define('CustomerOrder', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        SRFNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DOROO: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        ClientName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ProjectName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ReferenceNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LetterDated: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        OtherInformation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SampleCollectedBy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CRIIA: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SOCR: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EDOD: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        TestToBeWitnessed: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ReportwithNABL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MOTCARA: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TSRMPBCO: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TACOTAAPRR: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AKPWITLIYPS: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ADITM: {
            type: DataTypes.STRING,
            allowNull: false
        },
        RegistrationId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'CustomerRegistrations',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
    }, {
        timestamps: false
    });

    return { CustomerOrder }
}