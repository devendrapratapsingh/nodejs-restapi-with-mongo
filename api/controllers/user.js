
const mongoose = require('mongoose')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.user_signup = (req, res, next)=>{
    User.find({ email: req.body.email }).exec()
    .then(doc =>{
        console.log("@@@::      "+doc.email)
       if(doc.length > 0){ 
          return res.status(409).json({
               message: "email already exists"
           })
       }else{
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
             }else{
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                });
               return user.save().then(result=>{
                res.status(200).json({
                    message: "user created"+ result.email
                });
            }).catch(err => {
                res.status(500).json({
                    err: err
                });
            })  ;
            }
        });
       
       }
    })
    
    .catch(err =>{
        res.status(500).json({
            err: err
        })
    });
    
};
exports.user_login = (req, res, next)=>{
    User.find({email: req.body.email}).exec()
    .then(user =>{
        if(user.length > 0){
            bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                if(err){
                   return  res.status(401).json({
                        message: "Auth Failed"
                    })
                }
                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        _id: user[0]._id
                    }, 
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: "Auth Successful",
                        token: token
                    })
                }
                return res.status(401).json({
                    message: "Auth Failed"
                })
            });
        }else{
            res.status(401).json({
                message: "Auth Failed"
            });
        }
    })
    .catch(err => {
        res.status(500).json({err: err});
    });
 };
 exports.user_delete = (req, res, next)=>{
    User.remove({_id: req.params.id}).exec()
    .then(result=>{
        res.status(200).json({
            message: "user deleted: "+ req.params.id
        })
    })
    .catch(err =>{
        res.status(500).json({err: err});
    })
};