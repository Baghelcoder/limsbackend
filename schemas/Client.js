module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        LaboratoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false
        },
        State: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Pin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhoneNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AlternatePhoneNo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AlternateEmail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        GSTNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PanNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        RegistrationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        NABLCertificateNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        NABLLogo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Designation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Logo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NABLvalidityFrom: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        NABLvalidityTo: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        UserCreate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SubscriptionDuration: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        ContactPerson: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    }, {
        timestamps: false
    });
    return Client

}