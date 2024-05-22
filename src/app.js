const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

//init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

//init db
require('./dbs/init.mongodb')

//init routes
app.get('/',(req,res,next)=>{
    stringComp = "hello"
    return res.status(200).send({
        name:"thong",
        message:stringComp.repeat(1000)
    })
})

module.exports = app