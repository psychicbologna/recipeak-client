import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
  render() {
    return (
      <main>
        <section>
          <h2>Collect your recipes. Refine your recipes. Master your recipes.</h2>
          <p>Let Recipeak guide you on the path to your culinary crests.</p>
        </section>
        <section>
          <h2>Awesome Foodie Hero Image and Stuff</h2>
          <a href="./about.html">Click to Learn More</a>
        </section>
        <section>
          <h2>Get Started Today!</h2>
          <Link to={`/signup`}>Sign Up Here</Link>
        </section>
      </main>
    )
  };
}