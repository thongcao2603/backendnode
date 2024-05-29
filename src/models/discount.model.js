'use strict'

const { model, Schema, Types } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var discountSchema = new Schema({
    discount_name:{
        type:String,
        required:true
    },
    discount_description:{
        type:String,
        required:true
    },
    discount_type:{
        type:String,
        default:'fixed_amount'
    },
    discount_value:{
        type:Number,
        required:true
    },
    discount_code:{
        type:String,
        required:true
    },
    discount_start:{
        type:Date,
        required:true
    },
    discount_end:{
        type:Date,
        required:true
    },
    discount_max_uses:{ // toi da bao nhieu discount
        type:Number,
        required:true
    },
    discount_uses_count:{//so luong discount da su dung
        type:Number,
        required:true
    },
    discount_users_used:{// danh sach user da su dung discount
        type:Array,
        default:[]
    },
    discount_max_uses_per_user:{// so luong toi da moi user dung duoc bao nhieu discount
        type:Number,
        required:true
    },
    discount_min_order_value:{
        type:Number,
        required:true
    },
    discount_shopId:{
        type:Schema.Types.ObjectId,
        ref:'Shop'
    },
    discount_is_active:{
        type:Boolean,
        default:true
    },
    discount_applies_to:{
        type:String,
        required:true,
        enum:['all','spcecific']
    },
    discount_product_ids:{//san pham duoc ap dung neu dung apply to specific
        type:Array,
        default:[]
    }

},
    {
        timestamps: true,
        collection: "Discounts"
    });

//Export the model
module.exports = {
    inventory:model('Discount', discountSchema)
};