import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
const images = require('../../assets/images/index');

export default class LandingPage extends Component {
  render() {
    return (
      <div className='LandingPage'>
        <section className='LandingPage__Copy LandingPage__Intro'>
          <h2>Collect your recipes. Refine your recipes. Master your recipes.</h2>
          <p>Let Recipeak guide you on the path to your culinary crests.</p>
          <img className='LandingPage__img' src={images.Mountain} alt='A mountain on a serving platter.' />
        </section>
        <section className="LandingPage__Copy">
          <h2>How it Works</h2>
          <h3>The Basics</h3>
          <ol className="LandingPage__ol">
            <li>
              <p>Create an account or sign in using the demo account <code>bonappetite</code> with the password <code>password</code>.</p>
            </li>
            <li>
              <p>Try adding your favorite recipe! The form includes a section for listing ingredients. Note that unit measurement is divided into categories, including approximate and US/Metric.
              </p>
            </li>
            <li>
              <p>View the recipe! The recipe has been added your homepage in a card list format. You may click on 'View' or the recipe's title to review it.</p>
              <img className="LandingPage__screenshot" src={images.HomeView} alt="A screenshot of the homepage view with several recipes listed on it." />
              <img className="LandingPage__screenshot" src={images.RecipeView} alt="A screenshot of a recipe for Tortilla Soup, showing some recipe stats and some of the ingredients." />
            </li>
            <li>
              <p>You can also edit the components of your recipe. Click on the 'Edit' link on the card to do so.</p>
            </li>
            <li>Finally, you can delete the recipe using the 'Delete' link on the form. Doing so will permanently remove the recipe from your account!</li>
          </ol>
        </section >
        <section className="LandingPage__Copy">
          <h3>Bonus Features</h3>
          <ul className="LandingPage__list">
            <li>
              <h4>Conversion</h4>
              <p>Want to try out your recipe using a different measurement system? Try the convert button!</p>
              <img className='LandingPage__screenshot' src={images.ConversionView1} alt='A screenshot of an ingredient defined as 1 tablespoon with a conversion button to grams.' />
              <img className='LandingPage__screenshot' src={images.ConversionView2} alt='A screenshot after the button is clicked, showing the tablespoon has changed to 14.3 grams.' />

              <p>When editing a recipe, click on 'Convert' to convert an ingredient into its opposite measurement.</p>

              <p>(Please note that this feature uses imprecise ratios and that certain measurements aren't accounted for when <a href="https://www.tasteofhome.com/article/is-there-really-a-difference-between-liquid-and-dry-measurements/">weighing dry vs. fluid ingredients.</a> This is something I hope to address in later builds.)
              </p>
            </li>
            <li>
              <h4>Custom Units</h4>
              <p>Don't like any of the preset units? No problem -- make your own!</p>
              <img className="LandingPage__screenshot" src={images.CustomView} alt="A screenshot of the custom unit feature, showing a fieldset with 'truckload' units defined." />
              <p>When creating or editing an ingredient, select 'Custom' to open a field and define your own unit name!</p>
              <p>The form will ask for a singular and plural version of your custom unit (eg. truckload, truckloads; gigaton, gigatons). This will be saved when you submit the ingredient.
              </p>
            </li>
          </ul>
        </section>
        <section className="LandingPage__Copy CallToAction">
          <h2>Get Started Today!</h2>
          <Link to={`/signup`}>Sign Up Here</Link>

          <img className="LandingPage__img" src={images.Peak} alt="A slice of pie pointing upward with a flag stuck in it."/>
        </section>
      </div >
    )
  };
}