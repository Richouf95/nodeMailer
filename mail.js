const nodemailer = require('nodemailer');

module.exports.send = async function () {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wourichouf95@gmail.com',
            pass: 'udxivwfbeneqhhbr'
        }
    })

    const mailOption = {
        from: 'wourichouf95@gmail.com',
        to: 'lilon60396@invodua.com',
        subject: 'tuto auto mailer',
        text: 'Ok'
    }

    await transporter.sendMail(mailOption, function(err,info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent : " + info.response);
        }
    })
}