'use strict'

const { product, clothing, electronic } = require('../models/product.model')
const { BadRequestError } = require('../core/error.response')
const { findAllDraftsForShop, publishProductByShop, findAllPublishedForShop, searchProductByUser, findAllProducts, findProductDetail } = require('../models/repo/product.repo')

class ProductFactory {  
    static productRegistry={}

    static registerProductType(type,classRef){
        ProductFactory.productRegistry[type] = classRef
    }


    static async createProduct(type,payload) {

        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError("Invalid product type")

            return new productClass(payload).createProduct()
    }

    static async updateProduct(type,payload) {

        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError("Invalid product type")

            return new productClass(payload).createProduct()
    }

    //put
    static async publishProductByShop({product_shop,product_id}){
        return await publishProductByShop({product_shop,product_id})
    }

    //query
    static async findAllDraftsForShop({product_shop,limit=50, skip=0}){
        const query = {product_shop,isDraft:true}
        return await findAllDraftsForShop({query,limit,skip})

    }

    static async findAllPublishedForShop({product_shop,limit=50, skip=0}){
        const query = {product_shop,isPublished:true}
        return await findAllPublishedForShop({query,limit,skip})

    }

    static async findProductByUser({keySearch}){
        return await searchProductByUser({keySearch})
    }

    static async findAllProducts({limit=50,sort='ctime', page=1,filter={isPublished:true}}){
        return await findAllProducts({limit,sort, page,filter, select:['product_name','product_price','product_thumb']})
    }

    static async findProductDetail({product_id}){
        return await findProductDetail({product_id,unSelect:['__v']})
    }
}

class Product {
    constructor({
        product_name, product_thumb, product_description, product_price,
        product_type, product_shop, product_attributes, product_quantity
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
        this.product_quantity = product_quantity
    }
    async createProduct(id) {
        return await product.create({...this,_id:id})
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop:this.product_shop
        })
        if (!newClothing) throw new BadRequestError('create new Clothing error')

        const newProduct = await super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequestError('create new Product error')

        return newProduct

    }
}

class Electronics extends Product {
    async createProduct() {
        const newEletronics = await electronic.create({
            ...this.product_attributes,
            product_shop:this.product_shop
        })
        if (!newEletronics) throw new BadRequestError('create new Clothing error')

        const newProduct = await super.createProduct(newEletronics._id)
        if (!newProduct) throw new BadRequestError('create new Product error')

        return newProduct

    }
}

ProductFactory.registerProductType('Electronics',Electronics)
ProductFactory.registerProductType('Clothing',Clothing)

module.exports = ProductFactory
