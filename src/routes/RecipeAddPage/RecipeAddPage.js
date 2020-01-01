import React, { Component } from 'react';
import DeleteRecipeConfirm from '../../components/modals/DeleteRecipeConfirm';
import { Button } from '../../components/Utils/Utils'
import RecipeForm from '../../components/forms/RecipeForm/RecipeForm';
import RecipeFormContext, { nullRecipe, nullIngredient } from '../../contexts/RecipeFormContext';



//TODO configure state and callbacks by adding necessary elements from edit
//TODO ingredient preview is simililarly broken.

export default class RecipeAddPage extends Component {

  static contextType = RecipeFormContext;

  static defaultProps = {
    match: { params: {} },
    recipe: nullRecipe,
    ingredients: [],
    currentIngredient: nullIngredient,
    error: null,
  }

  state = {
    error: '',
    disable: false
  }

  //Handles click on any button that freezes the form [delete, ingredient edit]
  handleClick = recipeId => {
    this.setState({ disable: true })
    this.context.toggleDisableFieldsets();
  }

  //Handles cancel delete, edit.
  handleCancel = event => {
    event.preventDefault();
    this.setState({ disable: false })
    this.context.toggleDisableFieldsets();
  }

  //Moves to home after deleting successful.
  handleDeleteSuccess = recipeId => {
    const { history } = this.props
    history.push('/home');
  }

  //Moves to recipe after submit successful.
  handleAddSuccess = recipeId => {
    const { history } = this.props
    history.push(`/recipes/${recipeId}`);
  }

  //TODO Handles delete submit
  handleDeleteSubmit = (event, recipeId) => {
    event.preventDefault();
    this.clearRecipe();
    this.handleDeleteSuccess()
  }

  //TODO Handles add submit. After context finishes, reroutes to the view page.
  handleAddSubmit = event => {
    event.preventDefault();
    this.context.onFormSubmit()
      .then(recipeId => {
        this.handleAddSuccess(recipeId)
      })
      .catch(error => {
        this.setState({ error: error })
        this.context.toggleDisableFieldsets();
      })
  }

  componentDidMount() {
    this.clearError();
    this.setState({ disable: false })
    this.context.enableFieldsets();
  }

  componentWillUnmount() {
    this.context.clearRecipe();
    this.setState({ disable: true })
  }

  clearError() {
    this.setState({ error: '' })
  }

  render() {
    const { recipe, ingredients } = this.context;
    const { disable } = this.state;

    return (
      <section className='RecipeAdd'>
        <h3>Add Recipe</h3>
        <RecipeForm
          recipe={recipe}
          ingredients={ingredients}
          disabled={disable}
          onSubmit={this.handleAddSubmit}
          formName='add'
        />
        {
          !disable
            ? <Button type='button' onClick={() => this.handleClick(recipe.id)}>Delete Recipe</Button>
            : <DeleteRecipeConfirm
              recipeName={recipe.name.value}
              show={this.state.disable}
              onDeleteSubmit={this.handleDeleteSubmit}
              onDeleteCancel={this.handleCancel} />
        }

      </section>
    )
  }
}

//TODO validation for form entries
//TODO a11y check