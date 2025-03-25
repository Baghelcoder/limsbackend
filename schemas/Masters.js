module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER, // Use BIGINT for larger ranges
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ProductGroup: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Field: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    const TestDetails = sequelize.define('TestDetails', {
        id: {
            type: DataTypes.INTEGER, // Use BIGINT for larger ranges
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        TestName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TestMethod: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        InfoMaping: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TemplateMaping: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pdfTemplatePath: { // Path to the PDF template
            type: DataTypes.STRING,
            allowNull: true // Allow null if no PDF template is associated
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        }
    }, );
    return { Product, TestDetails }
}