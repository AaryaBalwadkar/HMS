import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBf9OFUOAiZtrnC4uyKq38goZHmhxoiuB8",
  authDomain: "blogging-website-practice.firebaseapp.com",
  projectId: "blogging-website-practice",
  storageBucket: "blogging-website-practice.firebasestorage.app",
  messagingSenderId: "17107660368",
  appId: "1:17107660368:web:c1a37d5688bd3f8de46b55"
};

const app = initializeApp(firebaseConfig);

// Google Auth

const provider = new GoogleAuthProvider()

export const auth = getAuth()

export const authWithGoogle = async () => {
    let user = null
    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user
}