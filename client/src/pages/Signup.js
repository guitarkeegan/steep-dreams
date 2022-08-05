import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { QUERY_INBOX} from '../utils/queries'

import { CREATE_USER,CREATE_INBOX,SEND_EMAIL} from '../utils/mutations'

//For Email Notification Service
import { gql, GraphQLClient } from 'graphql-request'
import  '../Signup.css';

import Auth from "../utils/auth";


//For Email Notification Service
const graphQLclient = new GraphQLClient('https://graphql.mailslurp.com', {
  headers: {
    'x-api-key': "e5c40a7a2ae4ac37608a68526123626d3a9b36e5f9279f59ea0bf0dd0a317241"
  },
});


const Signup =  () => {

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });


  const [addUser, { error, data }] = useMutation(CREATE_USER);



//For Email Notification Service

  // var  inboxes;
  // graphQLclient.request(QUERY_INBOX)
  //                     .then(res=> {
  //                       inboxes=res;
  //                       console.log(res);
  //                     }
  //                       )
  //                     .catch(err=>console.log(err))  
  //                     console.log("Inboxes here");
  //                     console.log(inboxes);




  
  const handleChange = (event) => {
  
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };




  const handleFormSubmit = async (event) => {
    
    event.preventDefault();



    try {
      
      const { data } = await addUser({
        variables: { ...formState },
      });

      //Email notification

      const { createInbox }=await  graphQLclient.request(CREATE_INBOX);

      const { sendEmail }=await  graphQLclient.request(SEND_EMAIL,{
        fromInboxId: createInbox.id,
        to: [createInbox.emailAddress],
        subject: 'Test',
      });


      // sendEmail();
    
      console.log(createInbox);

      Auth.login(data.addUser.token);

    

    } catch (e) {
      console.error(e);
    }
  };

 

  return (
    <main className="flex-row justify-center signup-main">
      <div className="col-12 col-lg-7">
        <div className="card p-4 form-card">
          <div className="card-header p-2"><h4>SIGN UP</h4></div>
          <div className="card-body">
            {data ? (
                <Link to="/"></Link>
            ) : (
              <form onSubmit={handleFormSubmit} className="d-flex flex-column py-2 px-3 signup-form">
                <div className="form-group d-flex justify-content-between align-items-center">
                <label>Email</label> 
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                <label className="px-1">Password</label> 
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                </div>
                <button
                  className="btn btn-primary my-3"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
           )} 
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )} 
          </div>
        </div>
      </div>
    
    </main>
  );
};

export default Signup;
