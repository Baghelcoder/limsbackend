const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { models } = require('../config/db');
const Staffofcompany = models.Staffofcompany
const Staffauthrizedtest = models.Staffauthrizedtest
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { logError } = require('./logError'); // Custom error logger
const Product = models.Product
const User = models.User
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/scanSign")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage });

// Route to create staff master and upload the image
router.post("/create-staffmaster", authenticateToken, upload.single('ScanSign'), async(req, res) => {
    try {
        const { Name, Designation, Qualification, DateOfJoining, YearOfExp, SignAuthority, ProductsId } = req.body;
        const scanSignFile = req.file; // Multer file object

        if (!scanSignFile) {
            return res.status(400).json({ error: 'ScanSign file is required' });
        }

        // Save the path of the uploaded file
        const scanSignPath = path.join('public/scanSign', scanSignFile.filename);
        const parsedProductsId = JSON.parse(ProductsId);

        // Save staff data to the database
        const staff = await Staffofcompany.create({
            Name,
            Designation,
            Qualification,
            DateOfJoining,
            YearOfExp,
            SignAuthority,
            Status: "Active",
            ScanSign: scanSignPath, // Save the path to the uploaded image
            UserId: req.user.id
        });

        if (!Array.isArray(parsedProductsId)) {
            await logError('Unexpected error occurred', 'ProductsId is not an array', { ProductsId, ...req.body });
            return res.status(400).json({ error: 'Invalid ProductsId format' });
        }

        // Associate staff with products (many-to-many relation)
        for (const productId of parsedProductsId) {
            const intProductId = parseInt(productId, 10); // Ensure integer value
            if (!isNaN(intProductId)) {
                try {
                    const result = await Staffauthrizedtest.create({
                        ProductsId: intProductId, // Use correct key
                        StaffofcompanyId: staff.id,
                    });
                } catch (error) {
                    await logError('Error creating Staffauthrizedtest', error.message, {
                        ProductsId: intProductId,
                        StaffofcompanyId: staff.id,
                        fullError: error
                    });
                }
            } else {
                await logError('Unexpected error occurred', 'Invalid ProductId', {...req.body });
            }
        }
        res.status(200).json({ message: 'Staff record created successfully' });
    } catch (error) {
        res.status(500).json({ error: "Error submitting staff data" });
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
    }
});

router.get('/staff-by-userid', authenticateToken, async(req, res) => {
    try {
        const userId = req.user.id;

        // Fetch staff data with associated products
        const staff = await Staffofcompany.findAll({
            where: { UserId: userId },
            include: [{
                model: Staffauthrizedtest,
                as: 'authorizedTests',
                attributes: ["ProductsId"],
                include: [{
                    model: Product,
                    as: 'product', // Adjust the alias if needed
                    attributes: ['name']
                }]
            }]
        });

        res.status(200).json({ staff });
    } catch (error) {
        res.status(500).json({ error: "Error submitting staff data" });
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
    }
});

router.get("/staff-by-product", authenticateToken, async(req, res) => {
    try {
        const { selectemploy, selectedProduct } = req.query; // Assuming ProductsId comes via query params

        if (!selectedProduct && !selectemploy) {
            return res.status(400).json({ error: "ProductsId is required" });
        }

        // Define SignAuthority based on selectemploy
        const signAuthorityMap = {
            orderfill: 'Tested By',
            datasheetfill: 'Report Review By',
            reportfill: 'Report Authorisation',
        };

        const SignAuthority = signAuthorityMap[selectemploy];
        if (!SignAuthority) {
            return res.status(400).json({ error: "Invalid selectemploy value" });
        }

        // Query staff members based on SignAuthority and selectedProduct
        const staff = await Staffofcompany.findAll({
            where: { UserId: req.user.createdBy, SignAuthority },
            attributes: ['id', 'Name', 'ScanSign'],
            include: [{
                model: Staffauthrizedtest,
                as: 'authorizedTests',
                where: { ProductsId: selectedProduct },
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['name'],
                }]
            }]
        });

        if (staff.length === 0) {
            return res.status(404).json({ error: 'No staff records found for the given product' });
        }

        res.status(200).json(staff);

    } catch (error) {
        if (error.name) {
            await logError(error.message, error.stack, {...req.body });
        } else {
            await logError('Unexpected error occurred', error.stack, {...req.body });
        }
    }
})

module.exports = router;