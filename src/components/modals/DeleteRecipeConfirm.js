import React, { Component } from 'react';
import { Button } from '../Utils/Utils'
import './DeleteRecipeConfirm.css'

//TODO check if modal works with add form.

// Handles deletion confirmaton
class DeleteRecipeConfirm extends Component {

  static defaultProps = {
    show: false,
  }

  render() {

    const { recipeId, recipeName, show, onDeleteSubmit, onDeleteCancel } = this.props

    if (!show) {
      return null;
    }

    return (
      <div className="DeleteRecipeConfirm__container">
        <section className="DeleteRecipeConfirm__content">
          <h3>Delete '{recipeName}'</h3>
          <p>Are you sure you want to delete this recipe?</p>
          <Button type='button' className='DeleteRecipeConfirm__button_confirm' onClick={event => onDeleteSubmit(event, recipeId)}> Yes, Delete </Button>
          <Button type='button' className='DeleteRecipeConfirm__button_close' onClick={event => onDeleteCancel(event)}> Cancel </Button>
        </section>
      </div>
    )
  }
};

export default DeleteRecipeConfirm;