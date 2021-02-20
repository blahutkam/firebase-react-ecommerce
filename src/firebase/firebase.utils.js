import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCaVo3z49kX9dw2hWjOsHER5YRkYg5egBQ",
  authDomain: "crwn-db-f2fd1.firebaseapp.com",
  projectId: "crwn-db-f2fd1",
  storageBucket: "crwn-db-f2fd1.appspot.com",
  messagingSenderId: "378553813922",
  appId: "1:378553813922:web:f3f1c34a837e2df77780fb",
  measurementId: "G-TPCSGZ2Q86",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;