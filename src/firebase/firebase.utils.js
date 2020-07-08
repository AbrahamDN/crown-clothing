import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA83t1aCrLsi5LAO39x3Nbf2D5DdYsP7LI',
  authDomain: 'crown-clothing-1.firebaseapp.com',
  databaseURL: 'https://crown-clothing-1.firebaseio.com',
  projectId: 'crown-clothing-1',
  storageBucket: 'crown-clothing-1.appspot.com',
  messagingSenderId: '954128564302',
  appId: '1:954128564302:web:181e57ce1ad0a48bb5c31f',
  measurementId: 'G-5FK05SY8NJ',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
