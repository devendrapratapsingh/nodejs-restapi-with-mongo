const express = require('express')
const router = express.Router();

router.get('/',(req, resp,next)=>{
    resp.status(200).json({
        message: "order fetch"
    });
});

router.post('/',(req, resp,next)=>{
    const order = {
        productId: req.body.productId,
        qty: req.body.qty
    }
    resp.status(201).json({
        message: "order created",
        order: order
    });
});


router.get('/:id',(req, resp,next)=>{
    
    resp.status(200).json({
        message: "order fetch",
        orderid: req.params.id
    });
});

router.delete('/:id',(req, resp,next)=>{
    
    resp.status(200).json({
        message: "order deleted",
        orderid: req.params.id
    });
});
module.exports = router;