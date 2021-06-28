const jwt = require('jwt-simple')
const moment = require('moment')

const checkToken = async ( req,res,next ) => {
    
    const userToken = req.headers['user-token']

    if(!userToken){ 
        return res.json(false)
    }

    let payload = {}

    try{
        payload = jwt.decode(userToken, 'wasuwasol')
    }catch(err){
        return res.json({error: 'token invalido'})
    }
 
    if(payload.expiredAt < moment().unix()){
        return res.status(200).json(3312)
    }

    next()
}

module.exports = {
    checkToken
}