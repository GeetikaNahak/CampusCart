import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  bio: string;
  lastSeen: number;
}

export const signup = async (username: string, email: string, password: string): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    const userProfile: UserProfile = {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey there! I am using ChatterBox",
      lastSeen: Date.now(),
    };

    await setDoc(doc(db, "users", user.uid), userProfile);
    await setDoc(doc(db, "chats", user.uid), { chatsData: [] });

  } catch (error: any) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

export const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

export const resetPassword = async (email: string): Promise<void | null> => {
  if (!email) {
    toast.error("Enter Your Email");
    return null;
  }

  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnap = await getDocs(q);

    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset Email Sent");
    } else {
      toast.error("Email doesn't exist");
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};

export { auth, db, analytics };
