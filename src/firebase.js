import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.envREACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMNENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export async function addQ(question) {
  const resRef = firestore.collection("questions");
  await resRef
    .add(Object.assign({}, question))
    .catch((error) => console.log(error));
}

export async function fetchQ(season, episode) {
  const snapshot = await firestore
    .collection("questions-" + season + "-" + episode)
    .get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function fetchByDate(season, episode) {
  const snapshot = await firestore
    .collection("questions-" + season + "-" + episode + "1")
    .get()
    .catch((error) => console.log(error));
  return snapshot.docs.map((doc) => doc.data());
}

export default firebase;
