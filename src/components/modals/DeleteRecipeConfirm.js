import React, { Component } from 'react';

class DeleteRecipeConfirm extends Component {

  static defaultProps = {
    show: false,
  }

  render() {

    const {recipeId, recipeName, show, submit, cancel } = this.props

    if(!show) {
      return null;
    }

    return (
      <section className="DeleteRecipeConfirm">
        <h3>Delete {recipeName}</h3>
        <p>Are you sure you want to delete this recipe?</p>
        <button type='button' className='DeleteRecipeConfirm__button_confirm' onClick={event => submit(event, recipeId)}> Yes, Delete </button>
        <button type='button' className='DeleteRecipeConfirm__button_close' onClick={event => cancel(event)}> Cancel </button>
      </section>
    )
  }
};

export default DeleteRecipeConfirm;