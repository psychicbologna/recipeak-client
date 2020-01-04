import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className='LandingPage'>
        <section className='LandingPage__Copy LandingPage__Intro'>
          <h2>Collect your recipes. Refine your recipes. Master your recipes.</h2>
          <p>Let Recipeak guide you on the path to your culinary crests.</p>
        </section>
        <section className="LandingPage__Copy instructions">
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

              <p>When viewing a recipe, click on 'Convert' to convert an ingredient into its opposite measurement.</p>

              <p>(Please note that this feature uses imprecise ratios and that certain measurements aren't accounted for when <a href="https://www.tasteofhome.com/article/is-there-really-a-difference-between-liquid-and-dry-measurements/">weighing dry vs. fluid ingredients.</a> This is something I hope to address in later builds.)
              </p>
            </li>
            <li>
              <h4>Custom Units</h4>
              <p>Don't like any of the preset units? No problem -- make your own!</p>
              <p>When creating an ingredient, select 'Custom' to open a field and define your own unit name!</p>
              <p>The form will ask for a singular and plural version of your custom unit (eg. truckload, truckloads; gigaton, gigatons). This will be saved when you submit the ingredient.
              </p>
            </li>
          </ul>
        </section>
        <section className="LandingPage__Copy CallToAction">
          <h2>Get Started Today!</h2>
          <Link to={`/signup`}>Sign Up Here</Link>
        </section>
      </div >
    )
  };
}