const express = require('express')
const router  = express.Router()

router.get('/', (req, res) => {
    res.send('hey from admin')
})

// http://localhost:3000/api/admin/add-category
router.get('/add-category', (req, res) => {
    res.render('products/addcategory')
})

module.exports = router