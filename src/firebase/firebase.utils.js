//we do firebase/app because firebase has all of the utility libraries included. we dont want any were not using because they are large, so we can import individually the packages we need. we need to first import firebase to gain access to its elements, like auth and firestore.
import firebase from 'firebase/app';

//we use firestore to take the auth.user object, whether it be a login form a third party or from our own sign up method, and store it in our own database to authentice custom generated accounts
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
/*
this function is gathering the data from the sign in with google, and storing it within firestore. it takes in the userAuth object that has been provided with the auth library. also takes in any additional data we might want. if the userAuth object doesnt exist, we exit the function. we only want it to run when someone signs in and we get a valid object. otherwise, we want to query inside of the firestore document to see if it already exists. when we query firestore either a document or collection, we get returned either a QueryReference object or a QuerySnapshot object. the reference is an object that represents the current place in the database we are calling for. docReference is used perform CRUD opererations. we can use set, get, update, delete. we can also add documents to collections using the collectionRef object .add method collectionRef.add({value:prop}). we get the snapshotObject from the refObject using the .get method. documentRef returns a documentSnapshot object and collectionRef returns a querySnapshot 
*/
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get(); // we use the reference object to either get or save data at this location in db

  // if a piece of data does not exist in that location, meaning the user has not been inputed into the db, we check if it exists using our snapshot var. if it doesnt exist, we create it taking in the displayname and email from the userAuth object. we also add a createdAt using the js date function to store when the account was created. 
  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    //here we use the .set method to store the three properties we defined above, along with any additional data we might store. we wrap it in a try catch block because it is an async request to our database to create this object, and we use the catch to log any errors. so if this snapshot doesnt exist, it will be created using the data from the userauth object.
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





  