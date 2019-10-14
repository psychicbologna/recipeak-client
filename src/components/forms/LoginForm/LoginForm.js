import React, { Component } from 'react'

export default class LoginForm extends Component {
  render() {
    return (
      <section className="signup-form">
      <form id="signup">
        <label for="username">Username</label>
        <input type="text" name="username" />
        <label for="password">Password</label>
        <input type="text" name="password" />
        <button type="submit">Submit</button>
      </form>
    </section>
    )
  }
}