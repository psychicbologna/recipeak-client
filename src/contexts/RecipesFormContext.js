import React, { Component } from 'react';

export const nullLiveInput = {
  value: null,
  touched: false,
}

export const nullRecipe = {
}

export const nullIngredient = {
  amount: nullLiveInput,
  ing_text: nullLiveInput,
  unit_set: nullLiveInput,
  unit_singular: nullLiveInput,
  unit_plural: nullLiveInput
}

const RecipesFormContext = React.createContext({
  loading: true,
  recipe: nullRecipe,
  name: nullLiveInput,
  author: nullLiveInput,
  prep_time: nullLiveInput,
  servings: nullLiveInput,
  instructions: nullLiveInput,
  ingredientCount: 0,
  ingredients: [],
  currentIngredient: nullIngredient,
  deleteModalIsOpen: false,
  toggleLoading: () => {},
  setError: () => { },
  clearError: () => { },
  updateName: () => { },
  updateAuthor: () => { },
  updatePrepTimeHours: () => { },
  updatePrepTimeMinutes: () => { },
  updateServings: () => { },

  updateAmount: () => { },
  updateIngText: () => { },
  updateUnitSet: () => { },
  updateUnitSingular: () => { },
  updateUnitPlural: () => { },
  addIngredient: () => { },
  removeIngredient: () => { },

  updateInstructions: () => { },
  handleSubmit: () => { },
  clearForm: () => { },

  toggleDeleteModal: () => { },
  setRecipe: () => { },
  setIngredients: () => { },
  clearRecipe: () => { }
})

export default RecipesFormContext;

export class RecipesFormContextProvider extends Component {
  state = {
    loading: true,
    recipe: {},
    name: nullLiveInput,
    author: nullLiveInput,
    prep_time_hours: nullLiveInput,
    prep_time_minutes: nullLiveInput,
    servings: nullLiveInput,
    instructions: nullLiveInput,
    ingredientCount: 0,
    ingredients: [],
    currentIngredient: nullIngredient,
    deleteModalIsOpen: false,
    error: null,
  }

  toggleLoading = () => {
    console.log('ToggleLoading firing')
    this.setState({
      loading: !this.state.loading
    })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  updateName = name => {
    this.setState({ name: { value: name, touched: true } })
  }

  updateAuthor = author => {
    this.setState({ author: { value: author, touched: true } })
  }

  updatePrepTimeHours = prep_time_hours => {
    this.setState({ prep_time_hours: { value: prep_time_hours, touched: true } })
  }

  updatePrepTimeMinutes = prep_time_minutes => {
    this.setState({ prep_time_minutes: { value: prep_time_minutes, touched: true } })
  }

  updateServings = servings => {
    this.setState({ servings: { value: servings, touched: true } })
  }

  updateAmount = amount => {
    this.setState(prevState => ({
      currentIngredient: { ...prevState.currentIngredient, amount: { value: amount, touched: true } }
    }));
  }

  updateIngText = ingText => {
    this.setState(prevState => ({
      currentIngredient: { ...prevState.currentIngredient, ing_text: { value: ingText, touched: true } }
    }));
  };

  updateUnitSet = unitSet => {
    this.setState(prevState => ({
      currentIngredient: { ...prevState.currentIngredient, unit_set: { value: unitSet, touched: true } }
    }));
  };

  updateUnitSingular = singular => {
    this.setState(prevState => ({
      currentIngredient: { ...prevState.currentIngredient, unit_singular: { value: singular, touched: true } }
    }));
  };

  updateUnitPlural = plural => {
    this.setState(prevState => ({
      currentIngredient: { ...prevState.currentIngredient, unit_plural: { value: plural, touched: true } }
    }));
  };

  addIngredient = (ev, ingredient) => {
    ev.preventDefault();

    const newIngredient = {
      amount: ingredient.amount.value,
      ing_text: ingredient.ing_text.value,
      unit_set: ingredient.unit_set.value,
      unit_data: {
        unit_singular: ingredient.unit_singular.value,
        unit_plural: ingredient.unit_plural.value
      },
      tempId: this.state.ingredientCount + 1
    }

    let oldList = this.state.ingredients;
    let newList;

    console.log(oldList);

    if (!oldList) {
      newList = [newIngredient]
    } else {
      newList = [...oldList, newIngredient]
    }

    console.log(newList);

    this.setState({ ingredients: newList })
    this.setState({ ingredientCount: this.state.ingredients.length + 1 })
    this.clearCurrentIngredient();
  }

  removeIngredient = tempId => {
    const filteredIngredients = this.context.ingredients.filter(ingredient => ingredient.tempID = tempId)
    this.setState({ ingredients: filteredIngredients })
    this.setState({ ingredientCount: filteredIngredients.length })
  }

  clearCurrentIngredient = () => {
    this.setState({ currentIngredient: nullIngredient })
    document.getElementById('ing_text').value = null;
    document.getElementById('amount').value = null;
    document.getElementById('unit_set_select').value = 'none';
  }

  updateInstructions = instructions => {
    this.setState({ instructions: { value: instructions, touched: true } })
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, prep_time_hours, prep_time_minutes, servings, instructions } = this.state;
    console.log('handleSubmit firing');
    console.log('Name: ', name);
    console.log('Prep Time: ', `${prep_time_hours} hours ${prep_time_minutes} minutes`);
    console.log('Servings: ', servings)
    console.log('Instructions: ', instructions)
    //TODO set up submit API on both ends. nullify form values too?
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      name: nullLiveInput,
      author: nullLiveInput,
      prep_time_hours: nullLiveInput,
      prep_time_minutes: nullLiveInput,
      servings: nullLiveInput,
      instructions: nullLiveInput,
      ingredientCount: 0,
      ingredients: [],
      currentIngredient: nullIngredient,
    })
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

  toggleDeleteModal = () => {
    this.setState({
      deleteModalIsOpen: !this.state.deleteModalIsOpen
    });
  }

  render() {
    const value = {
      name: this.state.name,
      author: this.state.author,
      //Prep time hours and minutes
      prep_time_hours: this.state.prep_time_hours,
      prep_time_minutes: this.state.prep_time_minutes,
      servings: this.state.servings,
      instructions: this.state.instructions,
      //Ingredient variables
      ingredientCount: this.state.ingredientCount,
      ingredients: this.state.ingredients,
      currentIngredient: this.state.currentIngredient,
      //Loading
      loading: this.state.loading,
      toggleLoading: this.toggleLoading,
      //Error
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      //Update recipe info
      updateName: this.updateName,
      updateAuthor: this.updateAuthor,
      updatePrepTimeHours: this.updatePrepTimeHours,
      updatePrepTimeMinutes: this.updatePrepTimeMinutes,
      updateServings: this.updateServings,
      //Ingredient callbacks
      updateAmount: this.updateAmount,
      updateIngText: this.updateIngText,
      updateUnitSet: this.updateUnitSet,
      updateUnitSingular: this.updateUnitSingular,
      updateUnitPlural: this.updateUnitPlural,
      addIngredient: this.addIngredient,
      removeIngredient: this.removeIngredient,
      //Instructions
      updateInstructions: this.updateInstructions,
      //Form submit
      handleSubmit: this.handleSubmit,
      //Form clear
      clearForm: this.clearForm,
      //Recipe Edit Form
      recipe: this.state.recipe,
      setRecipe: this.setRecipe,
      setIngredients: this.setIngredients,
      clearRecipe: this.clearRecipe,
      //Delete modal
      deleteModalIsOpen: this.state.deleteModalIsOpen,
      toggleDeleteModal: this.toggleDeleteModal,
    };
    return (
      <RecipesFormContext.Provider value={value}>
        {this.props.children}
      </RecipesFormContext.Provider>
    )
  };

}