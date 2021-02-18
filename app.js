const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//mongodb+srv://<username>:<password>@node-restapi.uxluz.mongodb.net/<dbname>?retryWrites=true&w=majority


mongoose.connect('mongodb+srv://motun:motunrayo@node-restapi.uxluz.mongodb.net/testDB?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected....'))
.catch(err => console.log(err));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



// 
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.use((req,res,next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) =>{
    res.status(error.status || 500); 
    res.json({
        error: {
            message: error.message
        }
    }) 
});


module.exports = app;
