const mongoose = require('mongoose')
const {getMongoConfig} = require('../config/config')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'

const mongooseConnect = () => {
    mongoose.set("strictQuery", false)
    mongoose.connect(MONGO_URL, getMongoConfig())
    .then(()=>console.info('Database Connected'))
    .catch(err =>{
        console.error(err)
        process.exit()
    })
}

module.exports = mongooseConnect