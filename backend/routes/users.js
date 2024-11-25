const express = require('express');
const router = express.Router();
const { fetchThemeByUID, addUserToDB, fetchUserData } = require('./database');

router.post('/', async (req, res) => {
    const uid = req.body.data; 
    try {
        const result = await addUserToDB(uid);
        res.status(201).json({ message: result });
    } 
    catch (error) {
        console.error('Server error', error);
        return res.status(500).send("Server error"); 
    }
});

module.exports = router;
