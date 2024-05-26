'use strict'

const { CREATED, OK } = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController {
    refreshToken = async(req,res,next)=>{
        new OK({
            message:'Success!',
            metadata: await AccessService.handleRefreshToken(req.body.refreshToken)
        }).send(res)
    }

    logout = async(req,res,next)=>{
        new OK({
            message:'Logout success!',
            metadata:await AccessService.logout(req.keyStore)
        }).send(res)
    }

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