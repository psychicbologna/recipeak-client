import React, {Component} from 'react';

export const nullLiveInput = {
  value: '',
  touched: false,
}

const RecipesFormContext = React.createContext({
  name: nullLiveInput,
  prep_time: nullLiveInput,
  servings: nullLiveInput,
  instructions: nullLiveInput,

  setError: () => {},
  updateName: () => {},
  updatePrepTime: () => {},
  updateServings: () => {},
  updateInstructions: () => {},
  handleSubmit: () => {},
  clearForm: () => {}
})

export default RecipesFormContext;

export class RecipesFormContextProvider extends Component {
  state = {
    name: nullLiveInput,
    prep_time: nullLiveInput,
    servings: nullLiveInput,
    instructions: nullLiveInput,
    error: null,
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  updateName = name => {
    this.setState({ name: { value: name, touched: true } })
  }

  updatePrepTime = prep_time => {
    this.setState({ prep_time: { value: prep_time, touched: true } })
  }

  updateServings = servings => {
    this.setState({ servings: { value: servings, touched: true } })
  }

  updateInstructions = instructions => {
    this.setState({ instructions: { value: instructions, touched: true } })
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, prep_time, servings, instructions } = this.state;
    console.log('handleSubmit firing');
    console.log('Name: ', name);
    console.log('Prep Time: ', prep_time);
    console.log('Servings: ', servings)
    console.log('Instructions: ', instructions)
  }

  clearForm = () => {
    this.setState({
      name: nullLiveInput,
      prep_time: nullLiveInput,
      servings: nullLiveInput,
      instructions: nullLiveInput,
    })
  }

  render() {
    const value= {
      name: this.state.name,
      prep_time: this.state.prep_time,
      servings: this.state.servings,
      instructions: this.state.instructions,
      error: this.state.error,
      setError: this.setError,
      updateName: this.updateName,
      updatePrepTime: this.updatePrepTime,
      updateServings: this.updateServings,
      updateInstructions: this.updateInstructions,
      handleSubmit: this.handleSubmit,
      clearForm: this.clearForm
    };
    return (
      <RecipesFormContext.Provider value={value}>
        {this.props.children}
      </RecipesFormContext.Provider>
    )
  };

}