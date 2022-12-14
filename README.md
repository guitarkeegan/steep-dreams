# Steep Dreams  ![MIT](https://img.shields.io/badge/license-MIT-green)

  - [Demo](#demo)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributions](#contributions)
  - [Questions](#questions)
  - [License](#license)
  - [Site](#site)

  ## Demo

  ![Demo](./client/src/images/Steep_Dreams.gif)

  ## Description
 
  Steep Dreams is an e-commerce website that allows users to registar and purchase their favorite teas.
  This web Application is built on a MERN stack and Styled using React Bootstrap and Semantic UI.
  Currently application allows user to sign up ,add products to the cart ,place an order navigate to a Payment Page(placeholder) and on Submit navigate to Order summary page which will list all the orders along with recent one placed by the user.
  Also the application sents out an email notification to the user while signing up and placing order
  Also Searchbar functionality to search for your favorite teas.Currently it works only on exact match with the product name


  ## Installation

  Clone the project and in the terminal type `npm run install` to install both the front and backend code in order to run in your local environment. You can also create user and product data by runing `npm run seed` in the terminal.

  ## Usage

  > The goal for this project was to practice creating an e-commerce style site that would incorperate both a payment and user notification functionalities. The backend of the site could be used as a starter template for future e-commerce websites.

  ## Contributions
  
  This project was created by Simmy Payyappilly Vargese, David Kanas, James Change and Keegan Anglim.

  ## Questions

  [Keegan's Github profile](https://github.com/guitarkeegan)
  [Simmy's Github profile]()
  [David's Github profile]()
  [James' Github profile]()

  [Keegan](mailto:keegananglim@gmail.com)
  [Simmy](mailto:simmyvarghese5@gmail.com)
  [David](mailto:dkanas0122@gmail.com)
  [James](mailto:james91055@gmail.com)

  ## License
  This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) - click the link to read the license.

  ## Site

  Check out the deployed at the link below.
  https://glacial-fortress-58935.herokuapp.com/
  
 # Technologies/Packages Used

 * Node JS
 * Express JS
 * React 
 * Graph QL
 * SMTP js Library for Notification
 *  semantic-ui-react 
 *  semantic-ui-css



 # References

 * Email Notification : USing Elastic Email-Mail Trap and SMTP JS library 
  
  <br>

   https://help.elasticemail.com/en/articles/4803409-smtp-settings

   https://www.youtube.com/watch?v=lZrDcjyoecY

 Sample Email Template
  ```    
      
       Host:"smtp.elasticemail.com ",
        Username:<ElasticEmail SMTP Credential Username>,
        Password:<ElasticEmail SMTP Credential Password>,
        To:<Valid Email Address>,
        From:<Valid Email Address>,
        Subject:"Test Email with mailtrap",
        Body:"Test Email with mailtrap"
        ````
    
 * Semantic UI Reference

 https://www.geeksforgeeks.org/reactjs-semantic-ui-search-module/
 