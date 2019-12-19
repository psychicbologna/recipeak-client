import React, { Component } from 'react'

export const nullRecipe = {
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
})

export default RecipeContext;

export class RecipeProvider extends Component {
  state = {
    recipe: nullRecipe,
    ingredients: [],
    error: null,
    setRecipe: () => { },
    setIngredients: () => { }
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

  setIngredients = ingredients => {
    this.setState({ ingredients })
  }

  clearRecipe = () => {
    this.setRecipe(nullRecipe)
    this.setIngredients([])
  }

  render() {
    const value = {
      recipe: this.state.recipe,
      ingredients: this.state.ingredients,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipe: this.setRecipe,
      clearRecipe: this.clearRecipe,
      setIngredients: this.setIngredients,
      addRecipe: this.addIngredient
    };

    return (
      <RecipeContext.Provider value={value}>
        {this.props.children}
      </RecipeContext.Provider>
    )
  }
};