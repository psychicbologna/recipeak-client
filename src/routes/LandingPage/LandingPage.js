import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LandingPage extends Component {
  render() {
    return (
      <div className='LandingPage__Copy'>
        <section>
          <h2>Collect your recipes. Refine your recipes. Master your recipes.</h2>
          <p>Let Recipeak guide you on the path to your culinary crests.</p>
        </section>
        <section className="LandingPage__Copy instructions">
          <h2>How it Works</h2>
          <h3>The Basics</h3>
          <ul className="LandingPage__list">
            <li>Create an account or sign in using the demo credentials.</li>
            <li>Try adding your favorite recipe! The recipe form covers some standard components, including an ingredients list. Note that the ingredient can be submitted using approximate and US/Metric units of measurement.</li>
            <li>View the recipe! The recipe has been added your homepage in a card list format. You may click on 'View' or the recipe's title to review it.</li>
            <li>You can also edit the components of your recipe. Click on the 'Edit' link on the card to do so.</li>
            <li>Finally, you can delete the recipe using the 'Delete' link on the card. Doing so will permanently remove the recipe from your account!</li>
          </ul>
          <h3>Bonus Features</h3>
          <ul className="LandingPage__list">
            <li>Want to try out your recipe using a different system? When viewing a compatible ingredient, you can approximate a switch between Metric and US measurements using the conversion feature! When viewing a recipe, click on the 'Convert' link to convert all the ingredients. (Please note that this feature uses imprecise ratios and that certain measurements aren't accounted for when <a href="https://www.tasteofhome.com/article/is-there-really-a-difference-between-liquid-and-dry-measurements/">weighing dry vs. fluid ingredients.</a>) This is something I hope to address in later builds.</li>
            <li>Don't like any of the preset units? No problem -- make your own! When creating an ingredient, select 'Custom' to open a field and define your own unit name! The form will ask for a singular and plural version of your custom unit (eg. truckload, truckloads; gigaton, gigatons). This will be saved when you submit the ingredient.</li>
          </ul>
        </section >
      <section className="LandingPage__Copy conversion">
      </section>
      <section className="LandingPage__Copy CallToAction">
        <h2>Get Started Today!</h2>
        <Link to={`/signup`}>Sign Up Here</Link>
      </section>
      </div >
    )
  };
}