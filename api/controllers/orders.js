const mongoose = require('mongoose')
const Order = require('../models/orders')
const Product = require('../models/products')
exports.orders_get_all = (req, resp,next)=>{
    Order.find().exec()
    .then(docs => {
       resp.status(200).json({
           count: docs.length,
           orders: docs.map(doc=>{
           return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
                type: "GET",
                url: "http://localhost:3000/products/"+doc.product
            }
           }
       })})
    })
    .catch(err => {
         resp.status(500).json({error: err})
    });
    
};

exports.order_create = (req, resp,next)=>{
    Product.findById(req.body.productId)
    .then(product => {
        
        if(!product){
            return resp.status(404).json({
                message: "product not found"
            });
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.qty
        });
        return order.save();
    })
    .then(result => {
        resp.status(201).json({
            message: "order created",
            order: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/"+result.product
                }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        resp.status(500).json({ error: err})
    });
   
};

exports.order_get = (req, resp,next)=>{
    Order.findById(req.params.id).exec()
    .then(result => {
        resp.status(200).json({
            message: "order found",
            order: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/products/"+result.product
                }
            }
        });
    }).catch(err =>{
        console.log(err);
        resp.status(500).json({ error: err})
    });

   
};

exports.order_delete = (req, resp,next)=>{
    Order.remove({_id: req.params.id}).exec()
    .then(result => {
        if(result.deletedCount === 0){
           return resp.status(404).json({
                message: "order not found",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders"
                }

            })
        }
        resp.status(200).json({
            message: "order deleted: "+ req.params.id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders"
                }
        })
    })
    .catch(err => {
        resp.status(500).json({ err: err})
    })
    
};