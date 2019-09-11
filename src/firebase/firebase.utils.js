import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAFmX9pWAhQBHpnb-wQzLwEc3xBGEvG1G8",
  authDomain: "shop-db-acb85.firebaseapp.com",
  databaseURL: "https://shop-db-acb85.firebaseio.com",
  projectId: "shop-db-acb85",
  storageBucket: "",
  messagingSenderId: "980158497475",
  appId: "1:980158497475:web:3f09e3bddc6291af3e1876"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  // console.log(snapShot);
  // console.log('you did it');
  // console.log('yeah, you ' + userAuth.displayName);
  // console.log(userAuth)
  // console.log(firestore.doc('users/12komcomc'))
  // console.log(userRef);

  return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
}

export default firebase;