import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const app = initializeApp({
  apiKey: "AIzaSyAgiuP024hyHaFVkzJ6ciYq4LoaClz6X6I",
  authDomain: "kettraworld-service.firebaseapp.com",
  projectId: "kettraworld-service",
  storageBucket: "kettraworld-service.appspot.com",
  messagingSenderId: "623673666339",
  appId: "1:623673666339:web:ae1a9ccfad3af252fbfa96",
  measurementId: "G-3M1TQQQ9L9"
});
const auth = getAuth(app);
const analytics = getAnalytics(app);

onAuthStateChanged(auth, (user) => {
  //console.log(user);
});

if (Cookies.get('account')) {
  $('#login').css('display', 'none');
  $('#account').css('display', 'flex');
};


$('#login').on('click', () => {
  
 signInWithPopup(auth, new GoogleAuthProvider()).then((google) => {
  
  $('#login').css('display', 'none');
  $('#account').css('display', 'flex');
  
    Cookies.set('account', google.user, { 
      secure: true, sameSite: 'strict', 
      httpOnly: false, expires: 7
    });
 
  }).catch((error) => console.log(error));
  
});