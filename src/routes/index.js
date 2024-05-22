'use strict'

const express = require('express')
const { apiKey } = require('../auth/checkAuth')
const router = express.Router()

router.use(apiKey)
router.use('/api/v1', require('./access'))

module.exports = router