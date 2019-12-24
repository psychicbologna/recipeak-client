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
      <form className='Form LoginForm' onSubmit={this.handleSubmitJwtAuth}>
        <Input
          inputId='username'
          inputLabel='Username'
          parentForm='LoginForm'
        />
        <Input
          inputId='password'
          inputLabel='Password'
          parentForm='LoginForm'
          type='password'
        />
        <Button type='submit'>
          Login
        </Button>
        {error && <div className='Alert' role='alert'> <p className='Alert__p'>{error}</p></div>
        }
      </form>
    )
  }
}