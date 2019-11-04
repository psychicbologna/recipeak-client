import React, { Component } from 'react';

class DeleteRecipeConfirm extends Component {

  static defaultProps = {
    show: false,
    onClose: () => {},
    onDeleteConfirm: () => {},
  }

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <section
        className="DeleteRecipeConfirm"

        >
        <h2>Delete {this.props.recipeName}</h2>
        <p>Are you sure you want to delete this recipe?</p>
        <button className='DeleteRecipeConfirm__button_yes'> {/*TODO onDeleteConfirm */}Yes</button>
        <button className='DeleteRecipeConfirm__button_no' onClick={this.props.onClose}>No</button>
      </section>
    )
  }
};

export default DeleteRecipeConfirm;