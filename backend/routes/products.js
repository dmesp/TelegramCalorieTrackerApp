const express = require('express');
const router = express.Router();
const { fetchProductByName } = require('./database');


router.post('/test', async (req, res) => {
    console.log("test")
    res.json({key: "products"});   
});


router.get('/:name', async (req, res) => {
    const productName = req.params.name;

    try {
        const products = await fetchProductByName(productName); 
        if (products.length === 0) {
            return res.status(404).json({ message: 'Продукт не найден' }); 
        }
        res.json(products); 
    } 
    catch (error) {
        console.error('Ошибка при получении продукта:', error);
        res.status(500).json({ message: 'Ошибка сервера' }); 
    }
});

module.exports = router;
