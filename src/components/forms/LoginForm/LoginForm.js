import React, { Component } from 'react';
import AuthApiService from '../../../services/auth-api-service';
import UserHomeContext from '../../../contexts/UserHomeContext'
import { Button, Input } from '../../Utils/Utils';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { },
    onLoginClick: () => { },
    resetHeader: () => { }
  };

  static contextType = UserHomeContext

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
        username.value = ''
        password.value = ''
        //Reset necessary components.
        this.context.onLogin(res.authToken, res.type);
        //Move to next/prev page.
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
        <input
          name='username'
          id='LoginForm__username' />
        <label htmlFor='LoginForm__password'>Password</label>
        <input
          name='password'
          id='LoginForm__password' />
        <Button type='submit'>
          Login
        </Button>
      </form>
    )
  }
}