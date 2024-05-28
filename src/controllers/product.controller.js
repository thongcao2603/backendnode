'use strict'

const { CREATED, OK, SuccessResponse } = require("../core/success.response")
const ProductService = require("../services/product.service")

class ProductController {
    createProduct = async(req,res,next)=>{
        new SuccessResponse({
            message:'Create new Product success!',
            metadata: await ProductService.createProduct(req.body.product_type,req.body)
        }).send(res)
    }

    //query
    getAllDraftsForShop= async(req,res,next)=>{
        new SuccessResponse({
            message:'Get product success!',
            metadata: await ProductService.findAllDraftsForShop({
                product_shop:req.user.userId
            })
        }).send(res)
    }
}

module.exports = new ProductController()