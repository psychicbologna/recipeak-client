import React, { Component } from 'react';
import RecipesApiService from '../../services/recipes-api-service';
import RecipeForm from '../../components/forms/RecipeForm/RecipeForm';
import DeleteRecipeConfirm from '../../components/modals/DeleteRecipeConfirm';
import { Button } from '../../components/Utils/Utils'
import RecipeFormContext, { nullRecipe, nullIngredient } from '../../contexts/RecipeFormContext';
import './RecipeEditPage.css'


export default class RecipeEditPage extends Component {
  static contextType = RecipeFormContext;

  static defaultProps = {
    match: { params: {} },
    recipe: nullRecipe,
    ingredients: [],
    currentIngredient: nullIngredient,
  }

  state = {
    error: null,
    disable: false
  }

  //Handles click on any button that freezes the form [delete, ingredient edit]
  handleClick = () => {
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
  handleEditSuccess = recipeId => {
    const { history } = this.props
    history.push(`/recipes/${recipeId}`);
  }

  //Handles delete submit
  handleDeleteSubmit = (event, recipeId) => {
    event.preventDefault();
    //Freeze form editing while it submits.
    this.context.toggleDisableFieldsets();

    RecipesApiService.deleteRecipe(recipeId)
      .then(() => {
        //Push to homepage.
        this.handleDeleteSuccess();
        //Allow form editing again.
        this.context.toggleDisableFieldsets();
      })
      .catch(error => {
        this.setState({ error: error })
        //Allow form editing again.
        this.context.toggleDisableFieldsets();
      })
  }

  //TODO Handles edit submit
  handleEditSubmit = (event) => {
    event.preventDefault();
    //Freeze form editing while it submits.
    this.context.toggleDisableFieldsets();

    return this.context.onFormSubmit()
      .then(id => {
        this.handleEditSuccess(id)
        this.context.toggleDisableFieldsets();
      })
      .catch(error => {
        this.setState({ error: error })
        this.context.toggleDisableFieldsets();
      })
  }

  componentDidMount() {
    this.clearError();
    const recipeId = this.props.match.params.recipe_id;
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

  clearError() {
    this.setState({ error: '' })
  }

  render() {
    const recipeId = this.props.match.params.recipe_id
    const { recipe, ingredients } = this.context;
    const { disable, error } = this.state;

    return (
      <section className={`RecipeEdit`}>
        <h2>Edit {`'${recipe.name.value}'`}</h2>
        <RecipeForm
          recipe={recipe}
          ingredients={ingredients}
          onDeleteSuccess={this.handleDeleteSuccess}
          onSubmit={this.handleEditSubmit}
          disabled={disable}
          formName='edit'
        />
        {
          !disable
            ? <Button className='RecipeDelete__submit' type='button' onClick={() => this.handleClick(recipe.id)}>Delete Recipe</Button>
            : <DeleteRecipeConfirm
              recipeId={recipeId}
              recipeName={recipe.name.value}
              show={this.state.disable}
              onDeleteSubmit={this.handleDeleteSubmit}
              onDeleteCancel={this.handleCancel} />
        }

        {error
          && <div className='Alert' role='alert'> <p className='Alert__p'>{error.message}</p></div>
        }
      </section>
    )
  }
}

//TODO validation for form entries
//TODO a11y check