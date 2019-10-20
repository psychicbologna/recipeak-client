import React, { Component } from 'react';
import { Button, Input } from '../../Utils/Utils';

export default class SignupForm extends Component {

  static defaultProps = {
    onSignupSuccess: () => { }
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { first_name, last_name, username, password } = ev.target;

    console.log('Signup Form submitted...')
    console.log({ first_name, last_name, username, password })

    first_name.value = '';
    last_name.value = '';
    username.value = '';
    password.value = '';
    this.props.onSignupSuccess();
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
          type='text'
          name='first_name'
          id='SignUpForm__first_name'>
        </Input>
        <label htmlFor='SignUpForm__last_name'>Last Name</label>
        <Input
          type='text'
          name='last_name'
          id='SignUpForm__last_name'>
        </Input>
        <label htmlFor='SignUpForm__username'>Username</label>
        <Input
          type='text'
          name='username'
          id='SignUpForm__username'>
        </Input>
        <label htmlFor='password'>Password</label>
        <Input
          type='text'
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