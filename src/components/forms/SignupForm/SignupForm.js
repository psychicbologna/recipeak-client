import React, { Component } from 'react';
import { Button, Input } from '../../Utils/Utils';
import AuthApiService from '../../../services/auth-api-service';

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
        <label htmlFor='SignUpForm__first_name'>First Name</label>
        <Input
          name='first_name'
          id='SignUpForm__first_name'>
        </Input>
        <label htmlFor='SignUpForm__last_name'>Last Name</label>
        <Input
          name='last_name'
          id='SignUpForm__last_name'>
        </Input>
        <label htmlFor='SignUpForm__username'>Username</label>
        <Input
          name='username'
          id='SignUpForm__username'>
        </Input>
        <label htmlFor='password'>Password</label>
        <Input
          name='password'
          id='SignUpForm__password'>
        </Input>
        {/*TODO Reenter password input */}

        <Button type='submit'>
          Sign Up!
        </Button>
      </form>
    )
  };
};