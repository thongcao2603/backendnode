'use strict'

const { model, Schema, Types } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var inventorySchema = new Schema({
    inven_productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    inven_location:{
        type:String,
        default:'unKnow'
    },
    inven_stock:{
        type:Number,
        required:true
    },
    inven_shopId:{
        type:Schema.Types.ObjectId,
        ref:'Shop'
    },
    inven_reservations:{
        type:Array,
        default:[]
    }
   

},
    {
        timestamps: true,
        collection: "Inventories"
    });

//Export the model
module.exports = {
    inventory:model('Inventory', inventorySchema)
};