import React, { Component } from 'react';
import TokenService from '../../../services/token-service';
import { Button, Input } from '../../Utils/Utils';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  };

  state = { error: null };

  handleSubmitBasicAuth = event => {
    event.preventDefault();
    const { user_name, password } = event.target;

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    );

    user_name.value = '';
    password.value = '';
    this.props.onLoginSuccess();
  }

  render() {
    const { error } = this.state;
    return (
      <form className='LoginForm' onSubmit={this.handleSubmitBasicAuth}>
        <div role='alert'>
          {error && <p className='error__p'>{error}</p>}
        </div>
        <label htmlFor='LoginForm__username'>
          Username
            </label>
        <Input
          name='user_name'
          id='LoginForm__user_name'>
        </Input>
        <label htmlFor='LoginForm__password'>Password</label>
        <Input
          name='password'
          id='LoginForm__password' />
        <Button type='submit'>
          Login
        </Button>
      </form>
    )
  }
}