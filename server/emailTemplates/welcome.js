const welcome = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Steep Dreams</title>
    <style>
      body {
        margin: 0;
        padding: 40px 0;
        background-color: #c1d29e;
        color: #3d0c02;
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
        border: 2px solid #3d0c02;
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
  <body style="background-color:#c1d29e;padding: 40px 0;">
    <div class="header" style="color:#3d0c02;"><h1>Steep Dreams</h1></div>
    <div class="sub-heading" style="color:#3d0c02;"><h2>Welcome, and thank you for signing up!</h2></div>
    <div class="outer-body">
        <div class="email-body" style="color:#3d0c02;">
            <p>Signing up for an account now gives you access to all of your <a href="https://glacial-fortress-58935.herokuapp.com/">products</a>. You may occasionally get an email from us if there is something new and exciting that we'd like to share. If you do not wish to share your inbox with us, no problem! Just hit the unsubscribe button in the email. It will not have any effect on your account with us.</p>
        </div>
    </div>
    
  </body>
</html>`

module.exports = welcome;
