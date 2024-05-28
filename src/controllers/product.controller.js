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

    //put
    publishProductByShop = async(req,res,next)=>{
        new SuccessResponse({
            message:'published Product success!',
            metadata: await ProductService.publishProductByShop({
                product_shop:req.user.userId,
                product_id:req.params.id
            })
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

    getAllPublishedForShop = async(req,res,next)=>{
        new SuccessResponse({
            message:'Get product success!',
            metadata: await ProductService.findAllPublishedForShop({
                product_shop:req.user.userId
            })
        }).send(res)
    }

    getProductByUser = async(req,res,next)=>{
        new SuccessResponse({
            message:'Get product success!',
            metadata: await ProductService.findProductByUser(req.params)
        }).send(res)
    }

    findAllProducts = async(req,res,next)=>{
        new SuccessResponse({
            message:'Get all products success!',
            metadata: await ProductService.findAllProducts(req.query)
        }).send(res)
    }

    findProductDetail = async(req,res,next)=>{
        new SuccessResponse({
            message:'Get all product success!',
            metadata: await ProductService.findProductDetail({
                product_id:req.params.product_id
            })
        }).send(res)
    }
}

module.exports = new ProductController()