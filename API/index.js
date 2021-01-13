require('dotenv').config();
const express = require('express')
const routes = require('./src/routes')
const cors= require('cors');
const bodyParser= require('body-parser')


const api= express()

api.use(bodyParser.urlencoded({
    extended:false
}))
api.use(cors())
api.use(bodyParser.json())
api.use(routes)

console.log(process.env.PORT)
api.listen(process.env.PORT||3000)