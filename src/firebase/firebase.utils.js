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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // example
  // const collectionRef = firestore.collection("users");
  // const collectionSnapshot = await collectionRef.get();
  //1
  // console.log({ collectionSnapshot });
  //2
  // console.log({ collection: collectionSnapshot.docs.map((doc) => doc.data()) });

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
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

//https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15189164#questions
//add collections from our app / redux to firebase
//rest of the function in App.js
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    //creates collection with our object names -hats, jackets etc.
    //const newDocRef = collectionRef.doc(obj.title);

    //creates collection with auto generated id
    const newDocRef = collectionRef.doc();
    //console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

//can you run just once to initialize?
firebase.initializeApp(config);

// fetch our collections from database
//reuse blog
//https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15234798#questions

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  // console.log(transformedCollection);

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
    //we're passing empty object as an initial acummulator
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//replaced with saga
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
