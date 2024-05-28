'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.get('/search/:keySearch',asyncHandler(productController.getProductByUser))
router.get('/get',asyncHandler(productController.findAllProducts))
router.get('/get/:product_id',asyncHandler(productController.findProductDetail))


//authentication
router.use(authentication)
router.post('/',asyncHandler(productController.createProduct))
router.post('/publish/:id',asyncHandler(productController.publishProductByShop))

//query
router.get('/drafts/all',asyncHandler(productController.getAllDraftsForShop))
router.get('/published/all',asyncHandler(productController.getAllPublishedForShop))


module.exports=router