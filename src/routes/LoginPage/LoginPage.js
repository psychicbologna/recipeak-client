import React, { Component } from 'react';
import LoginForm from '../../components/forms/LoginForm/LoginForm';

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = username => {
    //Track history, move to '/recipes' on successful login
    const { location, history } = this.props;
    const destination = (location.state || {}).from || `/user/${username}`;
    history.push(destination);
  }

  render() {
    return (
      <section className='LoginPage'>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}