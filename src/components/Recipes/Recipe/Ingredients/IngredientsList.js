import React, { Component } from 'react';
import Ingredient from './Ingredient/Ingredient';

export default class IngredientList extends Component {

  renderDummyList(n) {
    for (let i; i <= n; i++) {
      return <li className="Ingredient__dummy"></li>
    }
  }

  render() {
    const { ingredients, listCount } = this.props

    if (!ingredients.length) {
      if (!listCount) {
        return <p>Enter an ingredient to get started. Recipes must be submitted with at least one ingredient.</p>
      } else {
        return <ul className="IngredientsList__dummy">
          {this.renderDummyList()}
        </ul>
      }

    } else {
      return (
        <section className="RecipeForm__ingredients-preview">
          <h3>Ingredients Preview</h3>
          <ul className='RecipeForm__ingredients-list'>
            {ingredients.map(ingredient => {
              return (
                <Ingredient
                  ingredient={ingredient}
                  key={ingredient.id}
                  form={true}
                />
              );
            })}
          </ul>
        </section>
      )
    }
  }
};