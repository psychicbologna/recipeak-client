import React, { Component } from 'react';
import RecipesApiService from '../../services/recipes-api-service';
import RecipeForm from '../../components/forms/RecipeForm/RecipeForm';
import DeleteRecipeConfirm from '../../components/modals/DeleteRecipeConfirm';
import { Button } from '../../components/Utils/Utils'
import RecipeFormContext, { nullRecipe, nullIngredient } from '../../contexts/RecipeFormContext';


export default class RecipeEditPage extends Component {
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
    deleting: false
  }

  //Handles click on delete button.
  handleDeleteClick = recipeId => {
    this.setState({ deleting: true })
    console.log(this.context);
    this.context.toggleDisableFieldsets();
  }

  //Handles cancel delete.
  handleDeleteCancel = event => {
    event.preventDefault();
    this.setState({ deleting: false })
    this.context.toggleDisableFieldsets();
  }

  //Moves to home after deleting successful.
  handleDeleteSuccess = recipeId => {
    const { history } = this.props
    console.log(history);
    console.log('moving to home!')
    history.push('/home');
  }

  //Handles delete submit
  handleDeleteSubmit = (event, recipeId) => {
    event.preventDefault();

    RecipesApiService.deleteRecipe(recipeId)
      .then(res => {
        console.log(res);
        this.handleDeleteSuccess()
      })
      .catch(error => {
        this.setState({ error: error })
        this.setState({ deleting: false })
        this.context.toggleDisableFieldsets();
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
        <RecipeForm
          recipe={recipe}
          ingredients={ingredients}
          onDeleteSuccess={this.handleDeleteSuccess}
          disabled={deleting}
          formName='edit'
        />
        {
          !deleting
            ? <Button type='button' onClick={() => this.handleDeleteClick(recipe.id)}>Delete Recipe</Button>
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

//TODO validation for form entries
//TODO a11y check