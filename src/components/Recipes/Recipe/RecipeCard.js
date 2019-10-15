import React, {Component} from 'react';

export default class RecipeCard extends Component {
  render() {
    return (
      <section class="recipe-card">
        <h2>Recipe Title</h2>
        <p>Category: Recipe Category</p>
        <p>Rating: Recipe Rating</p>
      </section>
    )
  };
};