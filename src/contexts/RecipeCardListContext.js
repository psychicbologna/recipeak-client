import React, { Component } from 'react'

const RecipeListContext = React.createContext({
  recipeList: [],
  deleteModalIsOpen: false,
  error: null,
  setError: () => {},
  setRecipeList: () => {},
  toggleDeleteModal: () => {},
  clearError: () => {},
})
export default RecipeListContext

export class RecipeListProvider extends Component {
  state = {
    recipeList: [],
    error: null,
  }

  setRecipeList = recipeList => {
    this.setState({ recipeList })
  }

  setError = error => {
    console.error(error);
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      recipeList: this.state.recipeList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipeList: this.setRecipeList
    }
    return (
      <RecipeListContext.Provider value={value}>
        {this.props.children}
      </RecipeListContext.Provider>
    )
  }

};