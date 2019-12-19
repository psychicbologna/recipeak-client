import React, { Component } from 'react';
import RecipesApiService from '../../services/recipes-api-service';
import RecipesEditForm from '../../components/forms/RecipesForm/RecipeEditForm';
import RecipeEditContext, { nullRecipe, nullIngredient } from '../../contexts/RecipesFormContext';


export default class RecipeEditPage extends Component {
  static defaultProps = {
    match: { params: {} },
    recipe: nullRecipe,
    ingredients: [],
    currentIngredient: nullIngredient,
    error: null,
  }

  state = {
    loading: true,
    error: ''
  }

  static contextType = RecipeEditContext;

  componentDidMount() {
    const recipeId = this.props.match.params.recipe_id;
    RecipesApiService.getRecipe(recipeId)
      .then(data => {
        this.context.setRecipe(data.recipe)
        this.context.setIngredients(data.ingredients)
      })
      .catch(this.context.setError)
      .then(this.setState({ loading: false }));
  }

  componentWillUnmount() {
    this.context.clearRecipe();
  }

  clearError() {
    this.setState({ error: '' })
  }

  render() {
    const { recipe, ingredients } = this.context;
    const { loading, error } = this.state;

    if (loading) {
      return (
        <p>Loading your recipe...</p>
      )
    }
    if (error) {
      return (
        <p>{error.error}</p>
      )
    } else {
      return (
        <section className={`RecipeEdit`}>
          <h3>Edit {`'${recipe.name.value}'`}</h3>
          <RecipesEditForm
            recipe={recipe}
            ingredients={ingredients}
          />
        </section>
      )
    }
  }
}
//TODO delete button and confirmation modal
//TODO validation for form entries
//TODO a11y check