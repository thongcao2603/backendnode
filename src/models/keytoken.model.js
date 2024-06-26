'use strict'

const { model, Schema, Types } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    publicKey: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    refreshTokensUsed: {
        type: Array,
        default: []
    },
    refreshToken:{
        type:String,
        required:true
    }

},
    {
        timestamps: true,
        collection: "KeyTokens"
    });

//Export the model
module.exports = model('KeyToken', keyTokenSchema);