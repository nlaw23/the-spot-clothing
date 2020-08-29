import React from 'react';

//Switch makes it so that once one route matches, thats the only thing we will render. Route allows us to navigate to different 'pages' within a Single page application

import {Route, Switch} from 'react-router-dom'; 
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from'./pages/shop/shop.component.jsx';
import SignInAndSignUpPage from'./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';

import {auth} from './firebase/firebase.utils';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null
  //this is telling our application that the user has been authenticated, also provides persistence of user sessions. essentially a messaging system between our app and the firebase system. whenever any changes occur on firebase relating to this application, firebase sends us a message telling us the state has been updated, meaning they either signed in or out. when it detects this, firebase will send us the user below. need to prevent memory leaks by using method above.
  componentDidMount() {
    //this line gives us a function that when called will close the subscription
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user});

      console.log(user);
    })
  }
  //we want to close the subscription whenever our component unmounts, so we call unsubscribefromauth when the component unmounts.
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );

  }
}

export default App;
