module.exports = (sequelize, DataTypes) => {
    const Reportnote = sequelize.define('Reportnote', {
        note: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: 'id'
            }
        }
    })
    return Reportnote;
}