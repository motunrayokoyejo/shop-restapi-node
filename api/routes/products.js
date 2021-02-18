const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Product = require('../models/product');

//Handle incoming GET request to /orders
router.get('/',(req, res, next) => {
    // res.status(200).json({
    //     message: 'Handling GET requests to /products'
    // });
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.post('/',(req, res, next) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
      product
      .save()
      .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: result
        });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error:err
          });
        })
    
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    // if (id === 'special'){
    //     res.status(200).json({
    //         message: 'YOu discovered the special ID',
    //         id: id
    //     });
    // } else{
    //     res.status(200).json({
    //         message: 'You passed an ID'
    //     });
    // }
    Product.findById(id).exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.patch('/:productId',(req,res,next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId',(req,res,next) => {
    // res.status(200).json({
    //     message: 'Deleted product!'
    // });
    const id = req.params.productId;
    Product.remove({_id: id})
});


module.exports = router; 