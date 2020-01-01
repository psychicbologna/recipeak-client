
import React, { Component } from 'react';
import RecipeContext from '../../contexts/RecipeContext';
import RecipesApiService from '../../services/recipes-api-service';
import { Section, PrepTimeDisplay } from '../../components/Utils/Utils';

export default class RecipePage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = RecipeContext;

  componentDidMount() {

    const recipeId = this.props.match.params.recipe_id;
    this.context.clearError()
    RecipesApiService.getRecipe(recipeId)
      .then(data => {
        this.context.setRecipe(data.recipe)
        this.context.setIngredients(data.ingredients)
      })
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearRecipe();
  }

  renderRecipe() {
    const { recipe, ingredients } = this.context;

    return (
      <div>
        <section className="Recipe__basic-info">
          <div className="Recipe__basic-info__name">
            <h3>{recipe.name}</h3>
          </div>
          {!!recipe.author
            && <div className='Recipe__basic-info__author'>
              <span>by {recipe.author}</span>
            </div>}
          {(!!recipe.prep_time_hours || !!recipe.prep_time_minutes)
            && <div className='Recipe__basic-info__prep-time'>
              <h4>Prep Time:</h4>
              <PrepTimeDisplay hours={recipe.prep_time_hours} minutes={recipe.prep_time_minutes} />
            </div>
          }
          {!!recipe.servings
            && <div className='Recipe__basic-info__servings'>
              <h4>Yields:</h4>
              <p className="Recipe__servings">{recipe.servings} Servings</p>
            </div>
          }
        </section>
        <section className="Recipe__ingredients">
          <h3>Ingredients</h3>
          {
            !!ingredients.length
              ? <Ingredients
                ingredients={ingredients}
              />
              : <p className="Ingredients__loading">Loading ingredients...</p>
          }
        </section>
        <section className="Recipe__instructions">
          <h3>Instructions</h3>
          <p>
            {recipe.instructions}
          </p>
        </section>

      </div>
    )
  }

  render() {
    const { error, recipe } = this.context;
    let content;
    if (error) {
      content = (error.error === `Recipe doesn't exist`)
        ? <p className='red'>Recipe not found</p>
        : <p className='red'>There was an error</p>
    } else if (!recipe.id) {
      content = <div className='loading' />
    } else {
      content = this.renderRecipe()
    }
    return (
      <Section className='RecipePage'>
        {content}
      </Section>
    )
  }
}

function Ingredients({ ingredients }) {
  if (ingredients.length) {
    return (
      <ul>
        {ingredients.map(ingredient =>
          <li key={ingredient.id} className='Ingredient'>
            {AmountFormat(ingredient.amount, ingredient.unit_data)} {UnitFormat(ingredient.amount, ingredient.unit_data)} {ingredient.ing_text}
          </li>)}
      </ul>
    )
  }
}

//Returns the unit as singular or plural depending on the amount.
function UnitFormat(amount, unitData) {
  if (amount === 1) {
    return unitData.unit_single;
  } else {
    return unitData.unit_plural;
  }
}

function AmountFormat(amount, unitData) {
  if (unitData.unit_plural && unitData.unit_single && amount > 0) {
    return amount
  }
  if (amount === 0.5) {
    return 'one half';
  }
  if (amount === .75) {
    return 'two thirds';
  }
  if (amount === .25) {
    return 'one fourth';
  }
}