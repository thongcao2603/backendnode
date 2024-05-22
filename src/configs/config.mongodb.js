require('dotenv').config()

const dev={
    app:{
        port: process.env.PORT ||3333
    },
    db:{
        host:process.env.DEV_DB_HOST||'localhost',
        port:process.env.DEV_DB_PORT||27017,
        name:process.env.DEV_DB_NAME||'dev'
    }
}

const config={dev}
const env = process.env.NODE_ENV||'dev'

module.exports = config[env]