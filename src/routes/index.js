const router = require('express').Router();
const shoppingService = require('../services/products');


router.get('/api/all_products_purchase', async (req,res) => {
    try {
        let response = await shoppingService.getAllProducts();
        res.json({
            products: response
        })
        .status(200)
    } catch (error) {
        res.json({
            message: "failed response"
        })
        status(500)
    }
})

router.get('/api/products_by_id/:id', async (req,res) => {
    let id = req.params.id
    try {
        let response = await shoppingService.getProductById(id);
        res.json({
             product: response 
        })
        .status(200)
    } catch (err) {
        res.json({
            message: "failed response"
        })
        status(500)
    }
})

router.get('/api/get_orders_by_id/:id', async (req,res) => {
    let id = req.params.id
    try{
        let response = await shoppingService.getOrdersById(id);
        res.json({
            orders: response 
        })
        .status(200)
    } catch (err) {
        res.json({
            message: "failed petition"
        })
        .status(500)
    }
})

router.get('/api/product_detail/:id', async (req,res) => {
    let id = req.params.id
    try {
        let response = await shoppingService.getProductDetailByOrderId(id);
        res.json({
            product: response
        })
        .status(200)
    } catch (error) {
        res.json({
            message: "failed petition"
        })
        .status(500)
    }
})

router.get('/api/get_orders/:id', async (req,res, next) => {
    let id = req.params.id
    try{
        let response = await shoppingService.getOrdersByUserId(id);
        res.json({
            orders: response
        })
        .status(200)
    } catch (error){
        next(error)
    }
})



module.exports = router;