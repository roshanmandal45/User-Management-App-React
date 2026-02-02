import { db } from "../config/firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

export const saveUser = async (user) => {
  await setDoc(doc(db, "users", user.uid), {
    
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    lastLogin: new Date(),
   
  });
   console.log(saveUser)
};

export const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
