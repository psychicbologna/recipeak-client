import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/forms/SignupForm/SignupForm';
import './SignupPage.css'

export default class SignupPage extends Component {

  static defaultProps = {
    history: {
      push: () => { },
    }
  }

  handleSignupSuccess = user => {
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    return (
      <div>
        <section className="SignupForm__section">
          <h2>Sign Up</h2>
          <SignupForm onSignupSuccess={this.handleSignupSuccess} />
        </section>

        <section className="SignupPage__copy">
          <p>Already signed up?</p>
          <Link to='/login'>
            Login
          </Link>
        </section>
      </div>
    )
  }
}