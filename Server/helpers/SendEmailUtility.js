var nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.rashedul.dev',
        port: 25,
        secure: false,
        auth: {
            user: "info@rashedul.dev",
            pass: '!170174Rajon'
        },tls: {
            rejectUnauthorized: false
        },
    });


    let mailOptions = {
        from: 'Inventory Manager Rashedul <info@rashedul.dev>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility