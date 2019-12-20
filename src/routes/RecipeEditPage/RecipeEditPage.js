import React, { Component } from 'react';
import RecipesApiService from '../../services/recipes-api-service';
import RecipeEditForm from '../../components/forms/RecipeForm/RecipeEditForm';
import DeleteRecipeConfirm from '../../components/modals/DeleteRecipeConfirm';
import RecipeFormContext, { nullRecipe, nullIngredient } from '../../contexts/RecipeFormContext';


export default class RecipeEditPage extends Component {
  static defaultProps = {
    match: { params: {} },
    recipe: nullRecipe,
    ingredients: [],
    currentIngredient: nullIngredient,
    error: null,
  }

  state = {
    error: '',
    deleting: false
  }

  static contextType = RecipeFormContext;

  //Delete callbacks

  //Handles click on delete button.
  handleDeleteClick = recipeId => {
    this.setState({
      deleting: true
    })
  }

  //Handles cancel delete.
  handleDeleteCancel = event => {
    event.preventDefault();
    this.setState({
      deleting: false
    })
  }

  //Moves to home after deleting successful.
  handleDeleteSuccess = recipeId => {
    const { history } = this.props
    console.log('moving to home!')
    history.push('/home');
  }

  //Handles delete submit
  handleDeleteSubmit = (event, recipeId) => {
    event.preventDefault();

    RecipesApiService.deleteRecipe(recipeId)
      .then(res => {
        this.handleDeleteSuccess()
      })
      .catch(error => {
        this.setState({ error: error })
      })
  }



  componentDidMount() {
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
    const { deleting } = this.state;

    return (
      <section className={`RecipeEdit`}>
        <h3>Edit {`'${recipe.name.value}'`}</h3>
        <RecipeEditForm
          recipe={recipe}
          ingredients={ingredients}
          onDeleteSuccess={this.handleDeleteSuccess}
          deleting={deleting}
        />
        {
          !deleting
            ? <button type='button' onClick={() => this.handleDeleteClick(recipe.id)}>Delete Recipe</button>
            : <DeleteRecipeConfirm
              recipeId={recipeId}
              recipeName={recipe.name.value}
              show={this.state.deleting}
              onDeleteSubmit={this.handleDeleteSubmit}
              onDeleteCancel={this.handleDeleteCancel} />
        }
      </section>
    )
  }
}

//TODO delete button and confirmation modal
//TODO validation for form entries
//TODO a11y check