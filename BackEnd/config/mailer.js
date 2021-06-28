//fbifvsqvervxknwa
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'AlkemyChallengeJS@gmail.com',
        pass: 'fbifvsqvervxknwa'
    }

})

transporter.verify().then( () => {
    console.log('listo para enviar')
})

// send mail with defined transport object
module.exports = transporter