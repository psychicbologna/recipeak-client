import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <section class="deleteconfirm">
        <h2>Delete [Recipe]</h2>
        <p>Are you sure you want to delete this recipe?</p>
        <button>Yes</button>
        <button>No</button>
      </section>
    )
  };
};