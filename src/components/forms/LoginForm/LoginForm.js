import React, { Component } from 'react';
import AuthApiService from '../../../services/auth-api-service';
import UserHomeContext from '../../../contexts/UserHomeContext'
import Input from '../Input/Input';
import { Button } from '../../Utils/Utils';
import './LoginForm.css';

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
      .catch(error => {
        this.setState({ error: error.message })
        console.log(this.state.error)
      })

  }

  componentDidMount() {
    this.setState({ error: null })
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
        <Button className='LoginForm__submit' type='submit'>
          Login
        </Button>
        {!!error
          && <div className='Alert' role='alert'> <p className='Alert__p'>{error}</p></div>
        }
      </form>
    )
  }
}