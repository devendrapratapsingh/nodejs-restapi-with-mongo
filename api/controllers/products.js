const Product = require('../models/products')
const mongoose = require('mongoose')

exports.products_all = (req, resp,next)=>{
    Product.find()
    .select('name price _id productImage')
   .exec()
   .then(docs => {
       console.log(docs);
       const response = {
           count: docs.length,
           products: docs.map(doc => {
               return {
                   name: doc.name,
                   price: doc.price,
                   productImage: doc.productImage,
                   id: doc._id,
                   request: {
                       type: "GET",
                       url: "http://localhost:3000/products/"+ doc._id
                   }
               };
           })
       };

       
       resp.status(200).json(response);
       
   })
   .catch(error => {
       console.log(error);
       resp.status(500).json({err: error});
   })
};
exports.product_get = (req, resp,next)=>{
    const id = req.params.id;
   Product.findById(id)
   .exec()
   .then(doc => {
       console.log(doc);
       if(doc){
       resp.status(200).json({
        name: doc.name,
        price: doc.price,
        productImage: doc.productImage,
        _id: doc._id
        
    });
       }else{
           resp.status(404).json({message: "No record found"})
       }
   })
   .catch(error => {
       console.log(error);
       resp.status(500).json({err: error});
   })
};
exports.product_create = (req, resp,next)=>{
    console.log(req.file);
    const product= new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result =>{
        console.log(result)
        resp.status(200).json({
            message: "Product created successfully",
            product: { 
                name: result.name,
                price: result.price,
                productImage: result.productImage,
                _id: result._id,
                request:[ {
                    type: "GET",
                    url: "http://localhost:3000/products/"+result._id
                },
                {
                    type: "GET",
                    url: "http://localhost:3000/"+result.productImage
                }]
            }
        });
    }).catch(error =>{
        console.log(error);
        resp.status(500).json({err: error})
    });
   
};
exports.product_update = (req, resp,next)=>{

    const updateOps = {};
    for ( const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Product.update({_id: req.params.id}, {$set: updateOps})
    .exec()
    .then(doc => {
        console.log(doc);
            
        resp.status(200).json({
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            request:[ {
                type: "GET",
                url: "http://localhost:3000/products/"+doc._id
            },
            {
                type: "GET",
                url: "http://localhost:3000/"+doc.productImage
            }]
        });
       
    })
    .catch(error => {
        console.log(error);
        resp.status(500).json({err: error});
    })
};
exports.product_delete = (req, resp,next)=>{

    Product.remove({_id: req.params.id})
    .exec()  
    .then(result => {
        console.log(result)
        resp.status(200).json({
            message: "product deleted successfully",
            request: {
                type: "POST",
                desc: "to create the product",
                url: "http://localhost:3000/products",
                body: { name: 'String', price: 'Number'}
            }
        })
    })
    .catch(err => {
        resp.status(500).json({error: err})
    });
 
 };