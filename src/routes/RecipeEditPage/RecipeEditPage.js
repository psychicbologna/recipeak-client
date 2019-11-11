import React, { Component } from 'react';
import RecipesApiService from '../../services/recipes-api-service';
import RecipesFormContext, { nullLiveInput, nullIngredient } from '../../contexts/RecipesFormContext';
import RecipesEditForm from '../../components/forms/RecipesForm/RecipeEditForm';


export default class RecipeEditPage extends Component {
  static defaultProps = {
    match: { params: {} },
    recipe: {},
    ingredients: {}
  }

  static contextType = RecipesFormContext;

  componentDidMount() {

    const recipeId = this.props.match.params.recipe_id;
    this.context.clearError()
    RecipesApiService.getRecipe(recipeId)
      .then(this.context.setRecipe)
      .catch(this.context.setError)
    RecipesApiService.getRecipeIngredients(recipeId)
      .then(this.context.setIngredients)
      .catch(this.context.setError)
      .then(this.context.toggleLoading);
  }

  componentWillUnmount() {
    this.context.clearRecipe();
  }

  render() {
    const {
      error,
      recipe,
      updateServings,
      updateAuthor,
      updateName,
      updatePrepTimeHours,
      updatePrepTimeMinutes,
      updateInstructions,
      toggleModal,
      handleSubmit,
      clearForm
    } = this.context;

    if (this.context.loading) {
      return (
        <p>Loading your recipe...</p>
      )
    }
    let content;
    if (error) {
      content = (error.error === `Recipe doesn't exist`)
        ? <p className='red'>Recipe not found</p>
        : <p className='red'>There was an error</p>
    } else if (!recipe.id) {
      return (<div className='loading' />)
    } else {
      return (
        <section className={`RecipeEdit`}>
          <h3>Edit {`'${recipe.name}'`}</h3>
          <RecipesEditForm
            units={this.props.units}
            updateServings={updateServings}
            updateAuthor={updateAuthor}
            updateName={updateName}
            updatePrepTimeHours={updatePrepTimeHours}
            updatePrepTimeMinutes={updatePrepTimeMinutes}
            updateInstructions={updateInstructions}
            toggleModal={toggleModal}
            onSubmit={handleSubmit}
            clearForm={clearForm}
          />
        </section>
      )
    }
  }
}
//TODO delete button and confirmation modal
//TODO validation for form entries
//TODO a11y check