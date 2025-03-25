module.exports = (sequelize, DataTypes) => {

    const UnitMaster = sequelize.define('UnitMaster', {
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    })

    return UnitMaster;

}