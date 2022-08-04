import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { CREATE_USER} from '../utils/mutations'

import  '../Signup.css';

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

    try {
      
      const { data } = await addUser({
        variables: { ...formState },
      });


      Auth.login(data.addUser.token);

    

    } catch (e) {
      console.error(e);
    }
  };

 

  return (
    <main className="flex-row justify-center m-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <div className="card-header bg-dark text-light p-2"><h4>Sign Up</h4></div>
          <div className="card-body">
            {data ? (
                <Link to="/"></Link>
            ) : (
              <form onSubmit={handleFormSubmit} className="d-flex flex-column py-5 signup-form">
                <div className="form-group">
                <input
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                </div>
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
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
