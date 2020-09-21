import React from 'react';

import {Route, Switch, Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';


import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from'./pages/shop/shop.component.jsx';
import SignInAndSignUpPage from'./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';

import Header from './components/header/header.component.jsx';

import {GlobalStyle} from './global.styles';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null
 
  componentDidMount() {

    const {setCurrentUser} = this.props;
    //this function is essentially saying if someone logs in, and the auth state changes, it will execute. we check if userauth exists and then call our createuserprofiledoc to add the user to the database.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
   
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
        //if the userauth object comes back and its null, we want to set the currentuser to userAuth, which is null. so when the user logs out, we will set this currentuser to null
      } else {

        setCurrentUser(userAuth);

      }
      
    });
  }
  //we want to close the subscription whenever our component unmounts, so we call unsubscribefromauth when the component unmounts.
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/checkout' component={CheckoutPage} />

          <Route exact
                 path='/signin' 
                 render={() => 
                  this.props.currentUser ? (
                    <Redirect to='/' />
                  ) : (
                    <SignInAndSignUpPage />
                  )
                }
          />
        </Switch>
      </div>
    );

  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch (setCurrentUser(user))

});

export default connect(mapStateToProps,mapDispatchToProps)(App);

