module.exports = (sequelize, DataTypes) => {

    const ClientUser = sequelize.define('ClientUser', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateofjoin: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        qualification: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profileimage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: "id"
            }
        }
    }, {
        timestamps: false,
    });

    return ClientUser;
}