
import * as fireBase from "firebase/app";
import * as fireBaseAuth from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, orderBy ,query } from "firebase/firestore"; 

const firebaseConfig = {

  apiKey: "AIzaSyAPZ3vn7QMvVNt1mHDRWJlXWCJy2Ka-n1M",
  authDomain: "mantermotivado-bfd03.firebaseapp.com",
  projectId: "mantermotivado-bfd03",
  storageBucket: "mantermotivado-bfd03.appspot.com",
  messagingSenderId: "346253474253",
  appId: "1:346253474253:web:bb6a2c6404dae0e407ac84",
  measurementId: "G-8WKWJ74BR8"
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
  
