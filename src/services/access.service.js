'use strict'
const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { BadRequestError, AuthFailureError } = require('../core/error.response')
const { findByEmail } = require('./shop.service')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    static logout = async({keyStore})=>{
        const delKey = await KeyTokenService.removeKeyById(keyStore._id)
        return delKey
    }

    static login = async ({ email, password, refreshToken = null }) => {

        //check shop exists by email
        const foundShop = await findByEmail({ email })
        if (!foundShop) throw new BadRequestError('Shop not registered')
        //compare password input with password found from foundShop
        const match = bcrypt.compare(password, foundShop.password)
        if (!match) throw new AuthFailureError('Authentication error')

        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });

        const {_id:userId} = foundShop
        //create again accesstoken, refreshtoken for user
        const tokens = await createTokenPair({
            userId, email
        },
            publicKey,
            privateKey)
        //save again refreshtoken, privkey, pubkey to db
         await KeyTokenService.createKeyToken({
            refreshToken:tokens.refreshToken,
            privateKey,publicKey,userId
         })   

        return {
            shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }

    }

    static signUp = async ({ name, email, password }) => {
        const shop = await shopModel.findOne({ email }).lean()
        if (shop) {
            throw new BadRequestError("Error: Shop already registered")
        }

        //hash password with salt=10
        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: [RoleShop.SHOP]
        })

        if (newShop) {
            //create publickey, privatekey
            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem'
                }
            });

            //save publickey, privatekey into db
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })

            if (!keyStore) {
                throw new BadRequestError("Something went wrong")
            }

            //sign payload, privatekey to create access token, refresh token return for client
            const tokens = await createTokenPair({
                userId: newShop._id, email
            },
                publicKey,
                privateKey)

            return {
                shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                tokens
            }
        }

        return null

    }
}

module.exports = AccessService