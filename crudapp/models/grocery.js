const mongoose = require('mongoose')

const grocerySchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    weight:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model('Grocery',grocerySchema)
