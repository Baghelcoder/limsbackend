// routes/assignpage.js
const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { models } = require('../config/db');
const Product = models.Product;
const TestDetails = models.TestDetails
const UserPage = models.UserPage
const ProductTestacc = models.ProductTestacc
const User = models.User
const { logError } = require('./logError');
const { where } = require('sequelize');
const router = express.Router();



router.post('/assign-products-tests', authenticateToken, async(req, res) => {
    try {
        const { UserId, ProductId, TestDetailId } = req.body;
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'You do not have permission to assign page' });
        }

        if (!UserId || !ProductId || !TestDetailId) {
            return res.status(400).json({ error: 'Client, Product, and Test are required' });
        }

        if (!Array.isArray(ProductId) || !Array.isArray(TestDetailId)) {
            return res.status(400).json({ error: 'ProductId and TestDetailId must be arrays' });
        }

        const client = await User.findByPk(UserId);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const products = await Product.findAll({ where: { id: ProductId } });
        const tests = await TestDetails.findAll({ where: { id: TestDetailId } });

        if (products.length !== ProductId.length || tests.length !== TestDetailId.length) {
            return res.status(404).json({ error: 'One or more products or tests not found' });
        }

        // Create or find UserPage entry
        const [userPage, created] = await UserPage.findOrCreate({
            where: { UserId, ProductId },
            defaults: { UserId, ProductId }
        });

        // Create ProductTestacc entries
        const productTestAccEntries = TestDetailId.map(testDetailId => ({
            UserPageId: userPage.id,
            TestDetailId: testDetailId
        }));

        await ProductTestacc.bulkCreate(productTestAccEntries, { ignoreDuplicates: true });


        res.status(200).json({ message: 'Products and tests assigned successfully to the client', });
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});


router.get('/allassignpage/:UserId', authenticateToken, async(req, res) => {
    try {
        const { UserId } = req.params;

        if (!UserId) {
            return res.status(400).json({ error: 'Client is required' });
        }

        // Fetch UserPage entries for the specified ClientId
        const userPages = await UserPage.findAll({
            where: { UserId },
            attributes: ['id', 'ProductId']
        });
        // Extract ProductIds and UserPageIds from the retrieved UserPages
        const productIds = userPages.map(userPage => userPage.ProductId);
        const userPageIds = userPages.map(userPage => userPage.id);

        // Fetch associated Products
        const products = await Product.findAll({
            where: { id: productIds }
        });

        // Fetch ProductTestacc entries for the UserPageIds
        const productTestAccEntries = await ProductTestacc.findAll({
            where: { UserPageId: userPageIds }
        });

        // Extract TestDetailIds from the retrieved ProductTestacc entries
        const testDetailIds = productTestAccEntries.map(entry => entry.TestDetailId);

        // Fetch associated TestDetails
        const testDetails = await TestDetails.findAll({
            where: { id: testDetailIds }
        });

        // Organize data by product with associated tests
        const productMap = products.reduce((map, product) => {
            map[product.id] = {
                ...product.toJSON(),
                tests: []
            };
            return map;
        }, {});

        testDetails.forEach(test => {
            const productId = test.ProductId;
            if (productMap[productId]) {
                productMap[productId].tests.push(test);
            }
        });

        const response = Object.values(productMap);

        res.status(200).json(response);
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});


router.get('/assignpage/fields', authenticateToken, async(req, res) => {
    try {
        if (req.user.role === 'client') {
            req.user = req.user.id
        } else {
            req.user = req.user.createdBy
        }
        const UserId = req.user;
        const userPages = await UserPage.findAll({
            where: { UserId },
            include: [{
                model: Product,
                attributes: ['Field']
            }],
            group: ['Product.Field']
        });
        const fields = userPages.map(up => up.Product.Field);
        res.status(200).json([...new Set(fields)]); // Remove duplicates
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

// Similarly, update other routes to use req.user.ClientId
router.get('/product-groups/:field', authenticateToken, async(req, res) => {
    try {
        if (req.user.role === 'client') {
            req.user = req.user.id
        } else {
            req.user = req.user.createdBy
        }
        const UserId = req.user;
        const { field } = req.params;

        const userPages = await UserPage.findAll({
            where: { UserId },
            include: [{
                model: Product,
                attributes: ['ProductGroup'],
                where: { Field: field }
            }],
            group: ['Product.ProductGroup']
        });

        const productGroups = userPages.map(up => up.Product.ProductGroup);
        res.status(200).json([...new Set(productGroups)]); // Remove duplicates

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/products/:productGroup', authenticateToken, async(req, res) => {
    try {
        if (req.user.role === 'client') {
            req.user = req.user.id
        } else {
            req.user = req.user.createdBy
        }
        const UserId = req.user;
        const { productGroup } = req.params;
        const userPages = await UserPage.findAll({
            where: { UserId },
            include: [{
                model: Product,
                attributes: ['id', 'name'],
                where: { ProductGroup: productGroup }
            }]
        });
        const products = userPages.map(up => up.Product);
        res.status(200).json(products);
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/allproduct', authenticateToken, async(req, res) => {
    try {
        if (!Product || !UserPage) {
            console.error("Model import failed. Check schema and path.");
        }
        if (req.user.role === 'client') {
            const userPages = await UserPage.findAll({
                where: { UserId: req.user.id },
                include: [{
                    model: Product,
                    attributes: ['id', 'name'],
                }]
            });
            const products = userPages.map(up => up.Product);
            res.status(200).json(products);
        } else if (req.user.role === 'user') {
            const userPages = await UserPage.findAll({
                where: { UserId: req.user.createdBy },
                include: [{
                    model: Product,
                    attributes: ['id', 'name'],
                }]
            });
            const products = userPages.map(up => up.Product);
            res.status(200).json(products);
        } else if (req.user.role === 'admin') {
            const product = await Product.findAll({
                attributes: ['id', 'name']
            })
            res.status(200).json(product)
        }

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/tests/:productId', authenticateToken, async(req, res) => {
    try {
        const { productId } = req.params;
        let extractedTests = {};
        if (req.user.role === 'client') {
            const tests = await UserPage.findAll({
                where: { ProductId: productId, UserId: req.user.id },
                include: [{
                    model: ProductTestacc,
                    as: "clienttests",
                    include: [{
                        model: TestDetails,
                        attributes: ['id', 'TestName', 'TestMethod']
                    }]
                }]
            });
            // Extract TestDetails from the nested structure
            extractedTests = tests.flatMap(test =>
                test.clienttests.flatMap(clientTest => clientTest.TestDetail)
            );
        } else if (req.user.role === 'user') {
            const tests = await UserPage.findAll({
                where: { ProductId: productId, UserId: req.user.createdBy },
                include: [{
                    model: ProductTestacc,
                    as: "clienttests",
                    include: [{
                        model: TestDetails,
                        attributes: ['id', 'TestName', 'TestMethod']
                    }]
                }]
            });
            // Extract TestDetails from the nested structure
            extractedTests = tests.flatMap(test =>
                test.clienttests.flatMap(clientTest => clientTest.TestDetail)
            );
        } else if (req.user.role === 'admin') {
            extractedTests = await TestDetails.findAll({ where: { ProductId: productId } })
        }
        res.status(200).json(extractedTests);
    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
        res.status(500).json({ error: 'Internal Server Error' })
    }
});


module.exports = router;