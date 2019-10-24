const express = require('express')
const router  = express.Router()

const cartController = require('./controllers/cartController')

router.get('/', cartController.getUserShoppingCart)

router.post('/product', cartController.addProductToCart)

router.delete('/remove', (req, res) => {
    res.send(`Don't know how to delete product yet :(`)
})

module.exports = router