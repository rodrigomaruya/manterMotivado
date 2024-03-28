
import * as fireBase from "firebase/app";
import * as fireBaseAuth from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, orderBy ,query } from "firebase/firestore"; 

const firebaseConfig = {

  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY ,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};
const app=fireBase.initializeApp(firebaseConfig);

export const auth=fireBaseAuth.initializeAuth(app,{
  persistence:fireBaseAuth.browserLocalPersistence
  
})

export const db= getFirestore(app)

export  const  users =async()=>{
  const querySnapshot = collection( db ,"frases");
  const q=query(querySnapshot,orderBy('frases','asc'))
  const querySnap=getDocs(q)
  return querySnap
 
}



  



// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

export default function FireB(email,pass){

  return fireBaseAuth.signInWithEmailAndPassword(auth,email,pass)
}

export function recuperaSenha(email){

  return fireBaseAuth.sendPasswordResetEmail(auth,email)
}

export function register(email,pass){

  return fireBaseAuth.createUserWithEmailAndPassword(auth,email,pass)
}
  
export function logOut(){
  return fireBaseAuth.signOut(auth)
}
  
