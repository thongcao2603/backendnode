'use strict'

const {model,Schema,Types, Collection} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME='shop'
const COLLECTION_NAME='Shops'

// Declare the Schema of the Mongo model
var shopSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxLength:150
    },
    email:{
        type:String,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        required:true,
    },
    verify:{
        type:Schema.Types.Boolean,
        default:false
    },
    roles:{
        type:Array,
        default:[]
    },
},{
    timestamps:true,
    collection:COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);