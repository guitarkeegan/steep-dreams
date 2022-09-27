import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { QUERY_INBOX } from "../utils/queries";

import { CREATE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted form, before try");
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
     

      //Send email using Elastic Email API and SMTP js Library
      //Below code rely on the /public/smtp.js file

      if(data){
        window.Email.send({

          SecureToken : "8466a82d-06a7-4a0a-96dc-067c65fb90c1",
          To:formState.email,
          From:"simmyvarghese5@gmail.com",
          Subject:"Sign Up Email from SteepDreams",
          Body:`
          <div">
          Hello ${formState.email.split('@')[0]},
          <br>
          <br>
          Thanks for signing up with Steep Dreams.
          <br>
          Continue Shopping our<a href="http://localhost:3000/products"> Products</a>
          <br>
          <br>
          Have a Steep  Dreams  !!
          <br>
          From Steep Dreams Team
          </div>`
        })
        .then((res)=>console.log("Email Sent Successfully",res))
        .catch(err=>console.log(err));
      }
      console.log("right before Auth Login");
      Auth.login(data.addUser.token);
      console.log("after auth.login");
    } catch (e) {
      console.error(e);
      
    }
  };

  return (
    <main className="flex-row justify-center signup-main mt-3 text-dark">
      <div className="col-12 col-lg-7 col-md-7">
        <div className="card p-4 form-card">
          <h4 className="card-header p-2">SIGN UP</h4>

          <div className="card-body">
            {data ? (
              <Link to="/"></Link>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className="d-flex flex-column py-2 px-3 signup-form"
              >
                <div className="form-group d-flex justify-content-between align-items-center">
                  <label>Email</label>
                  <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <label className="px-2">Password</label>
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
