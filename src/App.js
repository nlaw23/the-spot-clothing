import React from 'react';

//Switch makes it so that once one route matches, thats the only thing we will render. Route allows us to navigate to different 'pages' within a Single page application

import {Route, Switch, Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from'./pages/shop/shop.component.jsx';
import SignInAndSignUpPage from'./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';


class App extends React.Component {
  unsubscribeFromAuth = null
  //this is telling our application that the user has been authenticated, also provides persistence of user sessions. essentially a messaging system between our app and the firebase system. whenever any changes occur on firebase relating to this application, firebase sends us a message telling us the state has been updated, meaning they either signed in or out. when it detects this, firebase will send us the user below. need to prevent memory leaks by using method above.
  componentDidMount() {

    const {setCurrentUser} = this.props;
    //this function is essentially saying if someone logs in, and the auth state changes, it will execute. we check if userauth exists and then call our createuserprofiledoc to add the user to the database.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //when we call onsnapshot we get back the snapshot object which is where we get the data related to the user we just possibly stored if it was a new authentication or the data related to the user already stored in our database. we can use the .data method to actually retrieve that data. we store this data in an object in state called currentUser with the properties uid from the userauth object, along with the properties from the database, createdAt, email, displayName, so that we can use the data from our database in our application. this was updated when we implemented redux. above comments need to be revised.
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
          //console.log(this.state);
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
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
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

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch (setCurrentUser(user))

});

export default connect(mapStateToProps,mapDispatchToProps)(App);
