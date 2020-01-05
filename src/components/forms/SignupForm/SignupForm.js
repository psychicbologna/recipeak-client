import React, { Component } from 'react';
import { Button } from '../../Utils/Utils';
import Input from '../Input/Input';
import AuthApiService from '../../../services/auth-api-service';
import './SignupForm.css'

export default class SignupForm extends Component {

  static defaultProps = {
    onSignupSuccess: () => { }
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, last_name, username, password } = ev.target;

    this.setState({ error: null })
    AuthApiService.postUser({
      username: username.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
    })
      .then(user => {
        first_name.value = '';
        last_name.value = '';
        username.value = '';
        password.value = '';
        this.props.onSignupSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state;

    return (
      <form className='SignupForm' onSubmit={this.handleSubmit}>
        <div role='alert'>
          {error && <p className='error__p'>{error}</p>}
        </div>
        <Input
          inputId='first_name'
          inputLabel='First Name'
          parentForm='SignUpForm'>
        </Input>
        <Input
          inputId='last_name'
          inputLabel='Last Name'
          parentForm='SignUpForm'>
        </Input>
        <Input
          inputId='username'
          inputLabel='Username'
          parentForm='SignUpForm'>
        </Input>
        <Input
          inputId='password'
          inputLabel='Password'
          parentForm='SignUpForm'
          type='password'
          >
        </Input>

        <Button className='SignupForm__submit' type='submit'>
          Sign Up!
        </Button>
      </form>
    )
  };
};