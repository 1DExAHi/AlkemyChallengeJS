const router = require('express').Router()

const middlewares = require('./middlewares')
const ApiOperationsRouter = require('./api/Operations')
const ApiCategoriesRourer = require('./api/Categories')
const ApiUserRouter = require('./api/User')

router.use('/operations', middlewares.checkToken ,ApiOperationsRouter)
router.use('/categories', ApiCategoriesRourer)
router.use('/users', ApiUserRouter)
router.use('/validatesession', middlewares.checkToken, (req,res)=>{
    res.status(200).json(true)
})

module.exports = router