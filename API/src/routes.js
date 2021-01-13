const express=require('express')
const routes = express.Router()
const transaction=require('./controller/transaction')


routes.post('/payment',transaction.payment)
routes.get('/paymentSucess',transaction.success)
routes.get('/paymentCancel',transaction.cancel)



module.exports = routes