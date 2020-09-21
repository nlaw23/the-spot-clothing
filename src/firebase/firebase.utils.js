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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get(); // we use the reference object to either get or save data at this location in db

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  //if we want to use this userRef object to do other things in different parts of our code, we must return it.
  return userRef;
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





  