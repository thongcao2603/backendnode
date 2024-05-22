'use strict'

const express = require('express')
const { apiKey, permissions } = require('../auth/checkAuth')
const router = express.Router()

router.use(apiKey)
router.use(permissions('0000'))
router.use('/api/v1', require('./access'))

module.exports = router