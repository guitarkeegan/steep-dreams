const nodemailer = require("nodemailer");



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
        text: "Tea Delights", // plain text body
        html: "<b>Tea Delights</b>", // html body
    });

  console.log("Message sent: %s", info.messageId);
} catch (err){
    console.log("Error sending welcome email\n" + err);
}
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  
}

async function sendOrderConfirmation(orderData) {

    let info = await transporter.sendMail({
        from: `"Steep Dreams" <${process.env.YAHOO_EMAIL}>`, // sender address
        to: newMember, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);

    }


module.exports = {sendWelcomeEmail, sendOrderConfirmation};
