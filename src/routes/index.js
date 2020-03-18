const router = require('express').Router();
const orderService = require('../services/orders');

router.get('/api/get_orders/:id', async (req,res, next) => {
    let id = req.params.id
    try{
        let response = await orderService.getOrdersByUserId(id);
        res.json({orders: response}).status(200)
    } catch (error){
        next(error)
    }
})

module.exports = router;