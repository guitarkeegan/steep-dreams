import React from "react";

const About = () => {
  return (

    <div className="container mt-5">
      <main className="row ">
        <div className="row justify-content-center text-center my-5 py-5">
          <div className="col-12 col-md-6 col-lg-6">
            <h2 className="my-4">About Us</h2>
            <p className="my-3 py-5 about-content">
              Once upon a time, James Chang had an idea. His idea was to throw
              all of his subpar teas into the trash and start a business. <br/>Along
              with his fellow tea enthusiasts and cofounders, Keegan "Teabag"
              Anglim, David "The Kettle" Kanas, and Simmy "Seeds" Varghese,
              James continues to live his dream each day, by personally
              selecting the most supurb, fragrent and delicious tea buds known
              to this universe.
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-6 my-5 about-image">
           <img src="https://images.unsplash.com/photo-1471440671318-55bdbb772f93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" width="300px" height="300px"/>
          </div>
        </div>
      </main>
    </div>

  );
};

export default About;
