const router = require('express').Router()

const { Categories } = require('../../config/db')

router.get('/get', async ( req,res ) => { 
 
    const categories = await Categories.findAll(
        {
            attributes: ['id','name'],
        }
    )

    res.json(categories) 
})

module.exports = router 