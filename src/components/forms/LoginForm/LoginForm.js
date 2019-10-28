import React, { Component } from 'react';
import TokenService from '../../../services/token-service';
import AuthApiService from '../../../services/auth-api-service';
import { Button, Input } from '../../Utils/Utils';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { },
    onLoginClick: () => {}
  };

  state = { error: null };

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { username, password } = ev.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value=''
        password.value=''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginClick();
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state;
    return (
      <form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>
        <div role='alert'>
          {error && <p className='error__p'>{error}</p>}
        </div>
        <label htmlFor='LoginForm__username'>
          Username
            </label>
        <Input
          name='username'
          id='LoginForm__username'>
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