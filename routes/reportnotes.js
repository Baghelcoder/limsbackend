const express = require('express');
const authenticateToken = require('../middlewhere/authMiddleware');
const { logError } = require('./logError');
const { models } = require('../config/db');
const Reportnote = models.Reportnote
const router = express.Router();

router.post("/create-report-notes", authenticateToken, async(req, res) => {
    try {
        const { note } = req.body
        const newnote = await Reportnote.create({
            note,
            UserId: req.user.id
        })
        res.status(200).json({ message: 'Report note is added' });

    } catch (error) {
        console.error(error);
        await logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get("/get-report-notes", authenticateToken, async(req, res) => {
    if (!Reportnote) {
        return console.log({ error: 'Reportnotes model not found' });
    }
    try {
        if (req.user.role === "client") {
            const getnotes = await Reportnote.findAll({ where: { UserId: req.user.id } })
            res.status(200).json(getnotes)

        } else {
            const getnotes = await Reportnote.findAll({
                where: { UserId: req.user.createdBy },
                attributes: ['note']
            })
            res.status(200).json(getnotes)
        }
    } catch (error) {
        await logError(error.message, error.stack, {...req.body });
        // Send a single response in case of an error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})



module.exports = router