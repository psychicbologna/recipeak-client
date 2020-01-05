import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm/LoginForm';
import './LoginPage.css'

class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    //After confirmed login success, track history, move to '/home'.
    const { location, history, } = this.props
    const destination = (location.state || {}).from || `/home`
    history.push(destination);
  }

  render() {
    return (
      <section className='LoginPage'>
        <h2>Log In</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        <div className="LoginPage__copy">
        <p>For a demo account, use username: <code>bonappetite</code>, password: <code>password</code></p>
        </div>
      </section>
    )
  }
}

//withRouter allows the component to access history without using it as a component in router.
export default withRouter(LoginPage);