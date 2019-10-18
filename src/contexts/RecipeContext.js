import React, { Component } from 'react'

export const nullRecipe = {
//TODO what will go here? User? categories?
}

const RecipeContext = React.createContext({
  recipe: nullRecipe,
  ingredients: [],
  error: null,
  setError: () => { },
  clearError: () => { },
  setRecipe: () => { },
  clearRecipe: () => { },
  setIngredients: () => { },
  addIngredient: () => { }
  //TODO change/delete ingredient
})

export default RecipeContext;

export class RecipeProvider extends Component {
  state = {
    recipe: nullRecipe,
    error: null,
  }


  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setRecipe = recipe => {
    this.setState({ recipe })
  }

  clearRecipe = () => {
    this.setRecipe(nullRecipe)
  }

  setIngredients = ingredients => {
    this.setState({ ingredients })
  }

  addIngredient = ingredient => {
    this.setIngredients([
      ...this.state.recipe.ingredients,
      ingredient
    ])
  }

  render() {
    const value = {
      recipe: this.state.recipe,
      // ingredients: this.recipe.ingredients,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipe: this.setRecipe,
      clearRecipe: this.clearRecipe
    };

    return (
      <RecipeContext.Provider value={value}>
        {this.props.children}
      </RecipeContext.Provider>
    )
  }
};