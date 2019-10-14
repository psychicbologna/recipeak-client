import React, { Component } from 'react';

export default class RegistrationForm extends Component {
  render() {
    return(
    <section className = "signup-form">
        <form id="signup">
  <label for="name">Name</label>
  <input type="text" name="name" />
  <label for="username">Username</label>
  <input type="text" name="username" />
  <label for="email">Email</label>
  <input type="text" name="name" />
  <label for="password">Password</label>
  <input type="text" name="password" />
  <label for="password">Reenter Password</label>
  <input type="text" name="password" />
  <button type="submit">Submit</button>
</form>
  </section >
  )};
};