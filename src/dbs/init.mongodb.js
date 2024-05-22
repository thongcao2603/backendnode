'use strict'

const mongoose = require('mongoose')
const {db:{host,name,port}} = require('../configs/config.mongodb')
require('dotenv').config()

const connectString = `mongodb://${host}:${port}/${name}`

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(connectString,{maxPoolSize:100})
            .then(() => {
                console.log('Connected Mongodb success')
            })
            .catch(err => {
                console.log('Error connect!')
            })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb
