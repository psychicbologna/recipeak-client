
import React, { Component } from 'react';
import RecipeContext, { nullRecipe } from '../../contexts/RecipeContext';
import RecipeApiService from '../../services/recipes-api-service';
import { Section } from '../../components/Utils/Utils';

export default class RecipePage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = RecipeContext;

  //TODO private?
  componentDidMount() {
    const { recipe_id } = this.props.match.params
    this.context.clearError()
    RecipeApiService.getRecipe(recipe_id)
      .then(this.context.setRecipe)
      .catch(this.context.setError)
    //TODO get recipe ingredients
  }

  componentWillUnmount() {
    this.context.clearRecipe();
  }

  //TODO separate ingredient into component
  renderIngredients() {
    const { recipe } = this.context;
    return (
      <ul className='ingredientslist'>
        {
          recipe.ingredients.map(
            ingredient => {
              //TODO add key when ingredients separated
              return (<li className="RecipePage__ingredient">
                <p className='RecipePage__ingredient-text'>
                  {ingredient}
                </p>
              </li>)
            }
          )
        }
      </ul>
    )
  }

  renderRecipe() {
    //TODO add ingredients when separated
    const { recipe } = this.context;
    return (
      <div>
        <h3>{recipe.title}</h3>
        {/*TODO utility to convert prep time*/}
        <p>Prep Time: {recipe.prep_time}</p>
        <p>Yields {recipe.servings} Servings</p>

        {/*TODO category and rating*/}
        <section>
          <h2>Ingredients</h2>
          { this.renderIngredients() }
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
    //TODO error isn't responding correctly on nonexistant recipe
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
