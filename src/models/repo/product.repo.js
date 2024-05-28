'use strict'

const {product,clothing, eletronic} = require('../product.model')
const {Types} = require('mongoose')
const {getSelectData, unGetSelectData} = require('../../utils')

const findAllDraftsForShop = async({query,limit, skip})=>{
    return await queryProduct({query,limit,skip})
}

const findAllPublishedForShop = async({query,limit, skip})=>{
    return await queryProduct({query,limit,skip})
}

const publishProductByShop = async({product_shop, product_id})=>{
    const foundShop = await product.findOne({
        product_shop:new Types.ObjectId(product_shop),
        _id:new Types.ObjectId(product_id)
    })
    if(!foundShop) return null

    foundShop.isDraft = false;
    foundShop.isPublished = true;
    const {modifiedCount} = await foundShop.updateOne(foundShop)
    return modifiedCount
}

const queryProduct = async({query,limit,skip})=>{
    return await product.find(query).populate('product_shop','name email -_id')
        .sort({update:-1})
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const searchProductByUser = async({keySearch})=>{
    const regexSearch = new RegExp(keySearch)
    const rs = await product.find({
        isPublished:true,
        $text:{$search:regexSearch}
    },{
        score:{
            $meta:'textScore'
        }
    }
).sort({ score: { $meta: 'textScore' } }).lean()
    return rs
}

const findAllProducts = async({limit,sort,page,filter,select})=>{
    const skip = (page-1) * limit
    const sortBy = sort === 'ctime' ? {_id:-1}:{_id:1}
    return await product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sortBy)
    .select(getSelectData(select))
    .lean()
}

const findProductDetail = async({product_id,unSelect})=>{
    return await product.find({
        isPublished:true,
        _id:product_id
    }).select(unGetSelectData(unSelect))
}

module.exports = {
    findAllDraftsForShop,
    findAllPublishedForShop,
    publishProductByShop,
    searchProductByUser,
    findAllProducts,
    findAllProducts,
    findProductDetail
}