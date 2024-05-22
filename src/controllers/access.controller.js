'use strict'

const { CREATED, OK } = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController {
    login = async (req, res, next) => {
        new OK({
            message: 'Login success',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    signUp = async (req, res, next) => {

        new CREATED({
            message: 'Registerted OK!',
            metadata: await AccessService.signUp(req.body)
        }).send(res)

    }
}

module.exports = new AccessController()