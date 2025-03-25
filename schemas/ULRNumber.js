module.exports = (sequelize, DataTypes) => {

    const Sequence = sequelize.define('Sequence', {
        year: {
            type: DataTypes.STRING(2),
        },
        currentValue: {
            type: DataTypes.INTEGER,
        },
        locationId: {
            type: DataTypes.STRING
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        timestamps: false, // To auto manage `createdAt` and `updatedAt`
    });
    return Sequence
}