const express = require('express')
const router = express.Router()
const Grocery = require('../models/grocery')
const { route } = require('express/lib/application')
const axios = require('axios');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('dev'));
const auth = require('../jwtauth/auth');

/*router.get('/', async(req,res) => {
   try{
        console.log("Router GET");
        const groceries = await Grocery.find()
        res.json(groceries)
    }catch(err){
        res.send('Error : ' + err)
    }
})*/

router.get('/', auth, async(req,res,next) => {
    console.log("Router GET");
    await Grocery.find().then(docs => {
        const response = {
        totalrecords: docs.length,
        grocery: docs.map(doc => {
            return {
            name: doc.name,
            description: doc.description,
            weight: doc.weight,
            price: doc.price,
            _id: doc._id
            };
        })
        };
        res.status(200).json(response);
    }).catch(err => {
        
        if(err.status == 401){
            res.status(401).json({
                error: 'Token Invalid or expired'
            });

        }else {
            res.status(500).json({
                error: 'An error occurred'
            });
        }
    });    
});


router.get('/:id',auth, async(req,res) => {
    try{
        const grocery = await Grocery.findById(req.params.id)
        res.json(grocery)
    }catch(err){
        if(err.status == 401){
            res.status(401).json({
                error: 'Token Invalid or expired'
            });

        }else {
            res.status(500).json({
                error: 'An error occurred'
            });
        }
    }
})

router.post('/',auth, async(req,res) => {
    const grocery1 = new Grocery({
        name: req.body.name,
        description: req.body.description,
        weight: req.body.weight,
        price: req.body.price
    })
    
    try{
        const a1 = await grocery1.save()
        res.json(a1)
    }catch(err){
        if(err.status == 401){
            res.status(401).json({
                error: 'Token Invalid or expired'
            });

        }else {
            res.status(500).json({
                error: 'An error occurred'
            });
        }
    }
})

router.put('/:id',auth, async (req,res) => {

    try{
        const grocery2 = await Grocery.findById(req.params.id)
        grocery2.price = req.body.price
        grocery2.description = req.body.description
        const a2 = await grocery2.save()
        res.json(a2)
    }catch(err){
        if(err.status == 401){
            res.status(401).json({
                error: 'Token Invalid or expired'
            });

        }else {
            res.status(500).json({
                error: 'An error occurred'
            });
        }
    }
})

router.patch('/:id',auth, async (req,res) => {

    try{
        const grocery2 = await Grocery.findById(req.params.id)
        grocery2.price = req.body.price
        const a2 = await grocery2.save()
        res.json(a2)
    }catch(err){
        if(err.status == 401){
            res.status(401).json({
                error: 'Token Invalid or expired'
            });

        }else {
            res.status(500).json({
                error: 'An error occurred'
            });
        }
    }
})

/*router.delete('/:id', async (req,res) => {
    try{
        const a2 = await grocery2.remove()
    }catch(err){
        res.send('Error : ' + err)
    }
})*/

router.delete("/:id", auth , async(req, res, next) => {
   
    try{
        const id = req.params.id;
        await Grocery.deleteOne({_id:id});
        
        res.status(200).json({
            message: 'Grocery deleted'
        });

    }catch(err){
        
        res.status(500).json({
            error: 'Error occured while deleting'
        });
    }
    
    
});

module.exports = router
