const nodemailer = require('nodemailer')

const sendEmail = async ({ fullname, email, message }) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_CLIENT,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const info = await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_ACCOUNT,
        subject: fullname,
        text: message,
        html: message,
    })

    return info
}

module.exports = { sendEmail }
