
import React, { Component } from 'react';
import RecipeContext from '../../contexts/RecipeContext';
import RecipeApiService from '../../services/recipes-api-service';
// import IngredientsList from '../../components/Recipes/Recipe/IngredientsList';
import { Section } from '../../components/Utils/Utils';

export default class RecipePage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = RecipeContext;

  componentDidMount() {
    const recipeId = this.props.match.params.recipe_id;
    this.context.clearError()
    RecipeApiService.getRecipe(recipeId)
      .then(this.context.setRecipe)
      .catch(this.context.setError)
    RecipeApiService.getRecipeIngredients(recipeId)
      .then(this.context.setIngredients)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearRecipe();
  }

  renderRecipe() {
    const { recipe, ingredients } = this.context;
    return (
      <div>
        <h3>{recipe.name}</h3>
        <p>Prep Time: {recipe.prep_time}</p>
        <p>Yields {recipe.servings} Servings</p>
        <section>
          <h2>Ingredients</h2>
          <Ingredients
            ingredients={ingredients}
           />
        </section>
        <section>
          <h2>Instructions</h2>
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

function Ingredients({ ingredients = []}) {
  return (
    <ul>
      {ingredients.map(ingredient => 
        <li key={ingredient.id} className='Ingredient'>
          {AmountFormat(ingredient.amount, ingredient.unit_data)} {UnitFormat(ingredient.amount, ingredient.unit_data)} {ingredient.ingredient}
        </li>)}
    </ul>
  )
}

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