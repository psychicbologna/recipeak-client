import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm/LoginForm';

class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    //Track history, move to '/home' on successful login
    const { location, history, } = this.props
    const destination = (location.state || {}).from || `/home`
    history.push(destination);
  }

  render() {
    return (
      <section className='LoginPage'>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
          onLoginClick={this.props.onLoginClick}
          loginStatus={this.props.loginStatus}
        />
      </section>
    )
  }
}

//withRouter allows the component to access history without using it as a component in router.
export default withRouter(LoginPage);