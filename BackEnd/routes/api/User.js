const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { check,validationResult } = require('express-validator')
const moment = require('moment')
const jwt = require('jwt-simple')
const transporter = require('../../config/mailer')

const { Users } = require('../../config/db')


router.post('/create', [
    check('userName','El nombre de usuario es obligatorio!').not().isEmpty(),
    check('pass','La contraseña es obligatoria!').not().isEmpty(),
    check('email', 'El email es obligatorio!').not().isEmpty().isEmail()
] ,async (req,res)=>{
    //console.log(req.body)

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json(errors)
    }

    const { email } = req.body

    req.body.pass = bcrypt.hashSync(req.body.pass,10)

    const user = await Users.create(req.body)    

    const ValidationLink = createValidationLink(req.body)

    await transporter.sendMail({
        from: '"Validar usuario en el Challenge!!" <AlkemyChalengeJS@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Validacion ✔", // Subject line
        html: "<a href='"+ValidationLink+"'>Por favor hacé click el siguiente link para validar tu usuario</a>", // html body
      });

    res.status(200).json(user)

})

router.post( '/login', async ( req,res )=>{

    const user = await Users.findOne({where: { userName: req.body.userName }})

    if(user){

        const passValid = bcrypt.compareSync(req.body.pass, user.pass)

        if(passValid){

            if(!user.validateEmail){
                res.json(3141)
            }else{
                res.json(createToken(user))
            }

        }else{
            res.json(false)
        }

    }else{

        res.json(false)
     
    }
 
})

router.get( '/validateUser', async ( req,res )=>{

    const { key } = req.query

    let payload = {}

    try{
        payload = jwt.decode(key, 'wasuwasol')
    }catch(err){
        return res.json({error: 'key invalido o caduada'})
    }

    await Users.update({validateEmail:true},{where: { userName: payload.usr_name }})
 
    res.json("<h1>CUENTA VERIFICADA</h1>")

    /*
    await Operations.update(req.body, {
        where: {id: req.params.idOperation}
    })
    */

})

const createToken = (user) =>{
    const payload = {
        usr_id: user.id,
        user_name: user.userName,
        createdAt: moment().unix(),
        expiredAt: moment().add(20,'minutes').unix()
    }

    return jwt.encode(payload, 'wasuwasol')

}

const createValidationLink = (user) =>{
    const payload = {
        usr_name: user.userName,
        createdAt: moment().unix(),
        expiredAt: moment().add(20,'minutes').unix()
    }

    return "http://localhost:3700/api/Users/validateUser?key="+jwt.encode(payload, 'wasuwasol')

}


module.exports = router