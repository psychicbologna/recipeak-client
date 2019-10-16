import React, { Components } from 'react'

export const nullRecipe = {
  
}

const RecipeContext = React.createContext({
  recipe: nullRecipe,
  error: null,
  setError: () => {},
  clearError: () => {},
  setRecipe: () => {},
  clearRecipe: () => {},
})

export default RecipeContext;

export class RecipeProvider extends Component {
  state={
    recipe: nullRecipe,
    error: null,
  }
};

setError = error => {
  console.error(error)
  this.setState({error})
}

clearError = () => {
  this.setState({error:null})
}

setRecipe = recipe => {
  this.setState({recipe})
}

clearRecipe = () => {
  this.setRecipe(nullRecipe)
}

render() {
  const value = {
    recipe: this.state.recipe,
    error: this.state.error,
    //TODO Ingredients here
    setError: this.setError,
    clearError: this.clearError,
    setRecipe: this.setRecipe,
    clearRecipe: this.clearRecipe
  }
  return (
    <RecipeContext.Provider value={value}>
      {this.props.children}
    </RecipeContext.Provider>
  )
}