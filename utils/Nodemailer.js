const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendmail = (res,next,mailOptions)=>{

    const tranport = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        post:465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD 
        }
    })


    // const mailOptions = {
    //     from:"Master Pvt. Ltd <hi.yogesh09@gmail.com>",
    //     to: req.body.email,
    //     subject:"Password Reset Link",
    //     "text":"do not share this link",
    //     html:`<h1>click link blow to reset password</h1>
    //     <a href="${url}">your otp is ${url}</a>`,

    // }

    tranport.sendMail(mailOptions,(err,info) => {
        if(err) return next(new ErrorHandler(`Server Error ${err}` ,404));
        console.log(info)
       return res.status(200).json({
        message:"mail sent successfull",
       })
    })



} 

