const router = require('express').Router()
const sequelize = require('sequelize')
const jwt = require('jwt-simple')

const { Operations } = require('../../config/db')
const { NUMBER } = require('sequelize')
//getTotalAmountEntry

router.get('/totalamount', async ( req,res ) => {

    const { usr_id } = jwt.decode(req.headers['user-token'], 'wasuwasol')

    const totalAmount = await Operations.findAll(
        {
            attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'totalamount']],
            where:{
                usr_id:usr_id,
            }
        }
    )
    console.log(totalAmount)
    res.json(totalAmount[0].dataValues.totalamount)
})

//getLast

router.get('/amount/bycategory', async ( req,res ) => {

    const { usr_id } = jwt.decode(req.headers['user-token'], 'wasuwasol')

    const totalAmount = await Operations.findAll(
        {
            attributes: ['typeOf','category',[sequelize.fn('sum', sequelize.col('amount')), 'totalamount']],
            group:['category','typeOf'],
            where:{
                usr_id:usr_id,
            }
        }
    )
    console.log(totalAmount)
    res.json(totalAmount)
})

//CRUD de operaciones

router.get('/get', async ( req,res ) => {

    const { usr_id } = jwt.decode(req.headers['user-token'], 'wasuwasol')
    
    const { filterTypeOf , filterCategory } = req.query

    const where = filterTypeOf && filterCategory ? { 
        
        usr_id:usr_id,
        typeOf:filterTypeOf,
        category:filterCategory

    } : filterTypeOf ? {

        usr_id:usr_id,
        typeOf:filterTypeOf

    } : filterCategory ? {
 
        usr_id:usr_id,
        category:filterCategory

    } : {
        usr_id:usr_id
    }

    //console.log(where)

    const operations = await Operations.findAll(
        {
            attributes: ['id','concept','dateOf','typeOf','category','amount'],
            order: [['id','DESC']],
            where:where
        }
    )

    for(let i=0; i< operations.length;i++){
        //console.log(operations[i].typeOf)
        if(operations[i].typeOf=='egreso'){
            operations[i].amount = operations[i].amount * -1
        }
    }
    
    res.json(operations)
})

router.get('/getLast', async ( req,res ) => {

    const { usr_id } = jwt.decode(req.headers['user-token'], 'wasuwasol')
    
    const limit = req.query.limit

    //console.log(where)

    const operations = await Operations.findAll(
        {
            attributes: ['id','concept','dateOf','typeOf','category','amount'],
            order: [['id','DESC']],
            limit: limit.NUMBER,
            where: {
                usr_id:usr_id
            }
        }
    )

    for(let i=0; i< operations.length;i++){
        //console.log(operations[i].typeOf)
        if(operations[i].typeOf=='egreso'){
            operations[i].amount = operations[i].amount * -1
        }
    }
    
    res.json(operations)
})


router.post('/create', async (req,res)=>{

    console.log(req.body.amount)

    if(req.body.typeOf === 'egreso'){

        req.body.amount =  req.body.amount*-1
        
    }

    const { usr_id } = jwt.decode(req.headers['user-token'], 'wasuwasol')

    const { concept, typeOf, dateOf, category, amount } = req.body

    const params = {
        usr_id:usr_id,
        concept:concept,
        typeOf:typeOf,
        dateOf:dateOf,
        category:category,
        amount:amount
        }

    console.log(params)
    const operation = await Operations.create(params)

    res.status(200).json(operation)

})
 
router.put('/update/:idOperation', async ( req, res) => {

    if(req.body.typeOf === 'egreso'){
        req.body.amount =  req.body.amount*-1
    }

    await Operations.update(req.body, {
        where: {id: req.params.idOperation}
    })
    res.json(true)
})

router.delete('/delete/:id', async ( req,res ) => {

    await Operations.destroy(
        {
            where:{
                id: req.params.id
            }
        }
    )

    res.json(req.params.id)
})

module.exports = router