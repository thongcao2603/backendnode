'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { authenticationRefresh } = require('../../auth/authUtils')
const router = express.Router()

router.get('/shop/login',asyncHandler(accessController.login))
router.post('/shop/signup', asyncHandler(accessController.signUp))

//authentication
router.use(authenticationRefresh)
router.get('/shop/logout',asyncHandler(accessController.logout))
router.post('/shop/refreshToken', asyncHandler(accessController.refreshToken))

module.exports=router