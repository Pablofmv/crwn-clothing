import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDLqzQK0Kfjmz0EflTWuCM-8NMCxcGIje4",
    authDomain: "crwn-db-2143c.firebaseapp.com",
    databaseURL: "https://crwn-db-2143c.firebaseio.com",
    projectId: "crwn-db-2143c",
    storageBucket: "crwn-db-2143c.appspot.com",
    messagingSenderId: "477390882809",
    appId: "1:477390882809:web:a0749e44c79a324f59df28",
    measurementId: "G-PC7FEV8NH4"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot);

    if(!snapShot.exists){
        
        const { displayName , email } = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




