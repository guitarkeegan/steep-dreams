const nodemailer = require("nodemailer");
// const welcomeHtml = require("../emailTemplates/welcome.html");


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
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome to Steep Dreams</title>
            <style>
              :root {
                --bg-color: #c1d29e;
                --text-color: #3d0c02;
                --form-header-color: #717c7a;
                --white-color: #fff;
                --black-color: #000;
                --btn-color: #3d0c02;
              }
              body {
                margin: 0;
                padding: 0;
                background-color: var(--bg-color);
                font-size: 1rem;
                font-size: 16px;
                color: var(--text-color);
              }
              .header{
                margin: 30px 0 0 0;
                text-align: center;
              }
              .sub-heading{
                text-align: center;
                padding: 0 20px;
              }
              .outer-body{
                text-align: center;
              }
              .email-body{
                font-style: italic;
                padding: 20px;
                margin: 40px auto;
                border: 2px solid var(--text-color);
                max-width: 400px;
              }
              p{
                font-size: 1.2rem;
              }
              h1 {
                margin: 10px auto;
                font-size: 3rem;
              }
              @media screen and (max-width: 480px){
                .email-body{
                    margin: 40px 20px;
                }
              }
            </style>
          </head>
          <body>
            <div class="header"><h1>Steep Dreams</h1></div>
            <div class="sub-heading"><h2>Welcome, and thank you for signing up!</h2></div>
            <div class="outer-body">
                <div class="email-body">
                    <p>Signing up for an account now gives you access to all of your <a href="https://glacial-fortress-58935.herokuapp.com/">products</a>. You may occasionally get an email from us if there is something new and exciting that we'd like to share. If you do not wish to share your inbox with us, no problem! Just hit the unsubscribe button in the email. It will not have any effect on your account with us.</p>
                </div>
            </div>
            
          </body>
        </html>`, // html body
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
