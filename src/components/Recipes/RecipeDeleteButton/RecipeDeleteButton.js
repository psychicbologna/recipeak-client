import React, { Component } from 'react';
import { Button } from '../../Utils/Utils';
import RecipesApiService from '../../../services/recipes-api-service';

//Displays the button and handles state of delete modal.
export default class RecipeEditPage extends Component {
  static defaultProps = {
    recipeId: null,
    recipeName: null,
    onDeleteClick: () => {},
    onDeleteSubmit: () => {},
    onDeleteSuccess: () => {},
  }

  handleLoginSuccess = () => {
    //Track history, move to '/home' on successful login
    const { location, history, } = this.props
    const destination = (location.state || {}).from || `/home`
    history.push(destination);
  }

  onDeleteClick = () => {
    this.setState({ recipeDeleteClicked: true })
  }

  handleDeleteSuccess = () => {
    const { location, history, } = this.props
    const destination = (location.state || {}).from || `/home`
    history.push(destination);
    //TODO set state to display delete confirmation message on home page.
  }

  handleDeleteConfirm = ev => {
    RecipesApiService.deleteRecipe(this.props.recipeId)
      .then(res => {
        this.props.onDeleteSuccess();
      })
  }

  render() {
    const { handleDeleteClick, handleDeleteSuccess } = this.props;
    return (
      <Button className='RecipeDeleteButton' onClick={handleDeleteClick} onDeleteSuccess={handleDeleteSuccess}>
        Delete Recipe
      </Button>
    )
  }
}