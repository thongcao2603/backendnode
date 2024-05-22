'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.get('/shop/login',asyncHandler(accessController.login))
router.post('/shop/signup', asyncHandler(accessController.signUp))

//authentication
router.use(authentication)
router.get('/shop/logout',asyncHandler(accessController.logout))

module.exports=router