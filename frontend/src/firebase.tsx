import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWY7cACGIBxMgvFDYFoDywQ8buALaTbPY",
  authDomain: "chatterbox-6430e.firebaseapp.com",
  projectId: "chatterbox-6430e",
  storageBucket: "chatterbox-6430e.appspot.com",
  messagingSenderId: "440580199044",
  appId: "1:440580199044:web:72995309bc0381bc5028d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
const signup = (_username: string, email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
const signInWithGoogle = () => signInWithPopup(auth, provider);

export { auth, provider, login, signup, signInWithGoogle, signOut };
