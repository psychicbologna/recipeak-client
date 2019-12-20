import React, { Component } from 'react';
import RecipesApiService from '../../services/recipes-api-service';
import RecipesEditForm from '../../components/forms/RecipesForm/RecipeEditForm';
import DeleteRecipeConfirm from '../../components/modals/DeleteRecipeConfirm';
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
    error: '',
    deleting: false
  }

  static contextType = RecipeEditContext;

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

  //Handles delete submit
  handleDeleteSubmit = (event, recipeId) => {
    event.preventDefault();

    this.setState({ deleting: false })
    this.handleDeleteSuccess()
  }

  //Moves to home after deleting successful.
  handleDeleteSuccess = recipeId => {
    const { history } = this.props
    console.log('Delete Firing')
    history.push('/home');
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
        <RecipesEditForm
          recipe={recipe}
          ingredients={ingredients}
          onDeleteSuccess={this.handleDeleteSuccess}
          deleting={deleting}
        />
        {
          !deleting
            ? <button onClick={() => this.handleDeleteClick()}>Delete Recipe</button>
            : <DeleteRecipeConfirm
              recipeId={recipeId}
              recipeName={recipe.name.value}
              show={this.state.deleting}
              submit={this.handleDeleteSubmit}
              cancel={this.onDeleteCancel} />
        }
      </section>
    )
  }
}

//TODO delete button and confirmation modal
//TODO validation for form entries
//TODO a11y check