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
  updatePrepTimeHours: () => {},
  updatePrepTimeMinutes: () => {},
  updateServings: () => {},
  updateInstructions: () => {},
  handleSubmit: () => {},
  clearForm: () => {}
})

export default RecipesFormContext;

export class RecipesFormContextProvider extends Component {
  state = {
    name: nullLiveInput,
    prep_time_hours: nullLiveInput,
    prep_time_minutes: nullLiveInput,
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

  updatePrepTimeHours = prep_time_hours => {
    this.setState({ prep_time_hours: { value: prep_time_hours, touched: true } })
  }

  updatePrepTimeMinutes = prep_time_minutes => {
    this.setState({ prep_time_minutes: { value: prep_time_minutes, touched: true } })
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
      prep_time_hours: nullLiveInput,
      prep_time_minutes: nullLiveInput,
      servings: nullLiveInput,
      instructions: nullLiveInput,
    })
  }

  render() {
    const value= {
      name: this.state.name,
      prep_time_hours: this.state.prep_time_hours,
      prep_time_minutes: this.state.prep_time_minutes,
      servings: this.state.servings,
      instructions: this.state.instructions,
      error: this.state.error,
      setError: this.setError,
      updateName: this.updateName,
      updatePrepTimeHours: this.updatePrepTimeHours,
      updatePrepTimeMinutes: this.updatePrepTimeMinutes,
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