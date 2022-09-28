const nodemailer = require("nodemailer");
const welcome = require("../emailTemplates/welcome.js");
const orderConfirmation = require("../emailTemplates/orderConfirmation.js");


// async..await is not allowed in global scope, must use a wrapper
async function sendWelcomeEmail(newMember) {
    try {
    let transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.YAHOO_EMAIL, // our email
          pass: process.env.YAHOO_API_PASSWORD, // our password
        },
      });
  // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Steep Dreams" <${process.env.YAHOO_EMAIL}>`, // sender address
        to: newMember, // list of receivers
        subject: "Welcome to Steep Dreams!", // Subject line
        text: "Welcome, and thank you for signing up!\n\nYou may occasionally get an email from us if there is something new and exciting that we'd like to share. If you do not wish to share your inbox with us, no problem! Just hit the unsubscribe button in the email. It will not have any effect on your account with us.", // plain text body
        html: welcome, // html body
    });

  console.log("Message sent: %s", info.messageId);
} catch (err){
    console.log("Error sending welcome email\n" + err);
}
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  
}

async function sendOrderConfirmation(purchaser) {

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.mail.yahoo.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.YAHOO_EMAIL, // our email
              pass: process.env.YAHOO_API_PASSWORD, // our password
            },
          });
      // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Steep Dreams" <${process.env.YAHOO_EMAIL}>`, // sender address
            to: purchaser, // list of receivers
            subject: "Order Confirmation", // Subject line
            text: "We have started processing your order and will update you when it ships. If you have any questions on need to make changes, just reply to this email. Thanks again from all of us at Steep Dreams!", // plain text body
            html: orderConfirmation, // html body
        });
    
      console.log("Message sent: %s", info.messageId);
    } catch (err){
        console.log("Error sending order confirmation email\n" + err);
    }

    }


module.exports = {sendWelcomeEmail, sendOrderConfirmation};
