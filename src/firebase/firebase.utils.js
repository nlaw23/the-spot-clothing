//we do firebase/app because firebase has all of the utility libraries included. we dont want any were not using because they are large, so we can import individually the packages we need. we need to first import firebase to gain access to its elements, like auth and firebase.
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyANJeElTFT5nfEW-qhQy2LCSY82W4Tm7tc",
    authDomain: "the-spot-clothing.firebaseapp.com",
    databaseURL: "https://the-spot-clothing.firebaseio.com",
    projectId: "the-spot-clothing",
    storageBucket: "the-spot-clothing.appspot.com",
    messagingSenderId: "218277071443",
    appId: "1:218277071443:web:f09c0a372fcb421149d4a6"
};

  // initializes app with config from above
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // gives us access to googleauthprovider from the auth library
  const provider = new firebase.auth.GoogleAuthProvider(); 
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;