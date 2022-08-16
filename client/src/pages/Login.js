import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../utils/mutations';

import Auth from '../utils/auth';


const Login = () => {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(USER_LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("formState");
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      console.log("from login page");
      console.log(data);
      // console.log("Data after submit");
      // console.log("email",data.login.user);
      // console.log("email",data.login.token);

      Auth.login(data.login.token);

      

    } catch (e) {
      console.error("Invalid Credentials");
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-7">
        <div className="card p-4 form-card">
          <h4 className="card-header p-2">LOGIN</h4>
          <div className="card-body">
            {data ? (
                <Link to="/"></Link>
            ) : (
              <form onSubmit={handleFormSubmit} className="d-flex flex-column py-2 px-3 signup-form">
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
                <div className="d-flex justify-content-end align-items-center">
                <button
                  className="btn btn-block btn-primary my-3 "
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
                </div>
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
    </div>
  );
};

export default Login;
