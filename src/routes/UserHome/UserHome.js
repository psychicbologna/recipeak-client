import React, { Component } from 'react';
import UserHomeNav from '../../components/navigation/UserHomeNav/UserHomeNav';
import UserHomeContext, {nullUser} from '../../contexts/UserHomeContext';
import { FormatName } from '../../components/Utils/Utils'
import RecipeCardList from '../../components/Recipes/RecipeCardList';
import UserApiService from '../../services/user-api-service'

export default class UserHome extends Component {

  static contextType = UserHomeContext;

  state = {
    error: '',
    user: nullUser,
    recipeList: [],
  }

  setError = error => {
    this.setState({ error });
  }
  clearError = error => {
    this.setState({ error: null })
  }
  setUserData = userData => {
    this.setState({
      user: userData.user,
      recipeList: userData.recipes
    })
  }


  componentDidMount() {
    //Set userdata in context.
    this.context.clearError()
    UserApiService.getUserData()
      .then(userData => {
        this.context.setUserData(userData);
        this.setUserData(userData);
      })
      .catch(error => this.setState({error}))
  }

  componentWillUnmount() {
    this.setState({error: null})
    this.setState({
      user: nullUser,
      recipes: []
    })
  }

  render() {
    const { recipeList, user } = this.state;

    console.log(this.state);

    if (user === nullUser && !recipeList.length) {
      return (
        <div className='loading'>
          {
            !this.state.error
              ? <p>Loading User Data...</p>
              : <p className='error'>{this.state.error.message}</p>
          }
        </div>
      )
    } else {
      return (
        <section className='UserHome'>
          <h2>{FormatName(user.first_name)}  Recipes</h2>
          <UserHomeNav username={user.username} />
          {
            !recipeList.length
              ? <p>There doesn't seem to be any recipes here. Try adding one!</p>
              : <RecipeCardList listCheck={recipeList.length} />
          }
        </section>
      )
    }
  };
}



