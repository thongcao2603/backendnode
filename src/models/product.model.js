'use strict'

const {model,Schema,Types} = require('mongoose'); // Erase if already required
const slugify = require('slugify')

const DOCUMENT_NAME='Product'
const COLLECTION_NAME='Products'

// Declare the Schema of the Mongo model
var productSchema = new Schema({
    product_name:{
        type:String,
        required:true
    },
    product_thumb:{
        type:String,
        required:true
    },
    product_description:{
        type:String,
    },
    product_slug:{
        type:String
    },
    product_price:{
        type:Number,
        required:true
    },
    product_quantity:{
        type:Number,
        required:true
    },
    product_type:{
        type:String,
        required:true,
        enum:['Electronics','Clothing','Furniture']
    },
    product_shop:{
        type:Schema.Types.ObjectId,
        ref:'Shop'
    },
    product_attributes:{
        type:Array,
        default:[]
    },
    product_ratingsAverage:{
        type:Number,
        default:4.5,
        min:[1,'Rating must be above 1.0'],
        max:[5,'Rating must be above 5.0'],
        set: (val) => Math.round(val *10)/10
    },
    product_variations:{
        type:Array,
        default:[],

    },
    isDraft:{
        type:Boolean,
        default:true,
        index:true,
        select:false
    },
    isPublic:{
        type:Boolean,
        default:false,
        index:true,
        select:false
    }

},{
    timestamps:true,
    collection:COLLECTION_NAME
});

productSchema.pre('save',function(next){
    this.product_slug = slugify(this.product_name,{lower:true})
    next()
})

const clothingSchema = new Schema({
    brand:{
        type:String,
        required:true
    },
    size:String,
    material:String
},{
    collection:'clothes',
    timestamps:true
})

const electronicSchema = new Schema({
    manufacturer:{
        type:String,
        required:true
    },
    model:String,
    color:String
},{
    collection:'electronics',
    timestamps:true
})

//Export the model
module.exports = {
    product:model(DOCUMENT_NAME, productSchema),
    electronic:model('Electronics', electronicSchema),
    clothing:model('Clothing',clothingSchema)
}