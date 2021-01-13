const paypal = require('../configs/paypal')
const connection = require('../database/connection')
module.exports={
    async payment(req,res){
        const {sku,name,price,currency,quantity,total,description}=req.body;
        const createPayment={
            'intent':'sale',
            'payer':{
                'payment_method':'paypal'
            },
            "redirect_urls": {
                "return_url": "http://a1fa01a4cf1d.ngrok.io/paymentSucess",
                "cancel_url": "http://a1fa01a4cf1d.ngrok.io/paymentCancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": name,
                        "sku": sku,
                        "price": price,
                        "currency": currency,
                        "quantity": quantity
                    }]
                },
                "amount": {
                    "currency": currency,
                    "total": total
                },
                "description": description
            }]        
        }
        paypal.payment.create(createPayment,function(error,payment){
            if(error)
                return res.statusCode(400).json({
                    'message':error
                })
            else{
                for(let i = 0;i < payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                        id= payment.id
                        res.redirect(payment.links[i].href);
                    }
                  }
            }
        })
    },

    async success(req,res){
        const {PayerID,paymentId} = req.query;
        paypal.payment.get(paymentId,function (error,payment){
            if(error)
                return res.statusCode(400).json({"error":"Erro ao localizar pagamento, por favor tente mais tarde!!"})
            else{
                var execute_payment_json = {
                    "payer_id": PayerID,
                    "transactions": [{
                        "amount": {
                            "currency": payment.transactions[0].amount.currency,
                            "total": payment.transactions[0].amount.total
                        }
                    }]
                };
                paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                    if (error) {
                        return res.status(400).json({"error":"Erro ao realizar pagamento, por favor tente mais tarde!!"})
                    } else {
                        connection("orders").insert({
                            id:payment.id,
                            state:payment.state,
                            create_time:payment.create_time,
                            update_time:payment.update_time,
                            total:payment.transactions[0].amount.total,
                            userEmail:payment.transactions[0].payee.email,
                            merchant_id:payment.transactions[0].payee.merchant_id,
                            description:payment.transactions[0].description
                        })
                       console.log(payment.id)
                       console.log(payment.state)
                       console.log(payment.create_time)
                       console.log(payment.update_time)
                       console.log(payment.transactions[0].amount.total)
                       console.log(payment.transactions[0].payee.email)
                       console.log(payment.transactions[0].payee.merchant_id)
                       console.log(payment.transactions[0].description)
                      }
                });
            }
        })
    },
    async cancel(req,res){
        res.status(200).json({"message":"Pagamento cancelado!!"})
    },
}