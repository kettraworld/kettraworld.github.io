import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled, setUserId } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const app = initializeApp({
  apiKey: "AIzaSyCpx2zcsD186xZWYKOgFWAebW5qGonDe1E",
  authDomain: "kettraworldapp.firebaseapp.com",
  projectId: "kettraworldapp",
  storageBucket: "kettraworldapp.appspot.com",
  messagingSenderId: "569440499533",
  appId: "1:569440499533:web:580fd43f923d1524332904",
  measurementId: "G-6DMN95TVML"
});
const auth = getAuth(app);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

setUserId(analytics, Cookies.get('GOOGLE_DISPLAYNAME') || 'N/A');

if (Cookies.get('GOOGLE_UID')) {
  $('#login').css('display', 'none');
  $('#account').css('display', 'flex');
};

$('#login').on('click', () => {
  
 signInWithPopup(auth, new GoogleAuthProvider()).then((google) => {
  
  $('#login').css('display', 'none');
  $('#account').css('display', 'flex');
  
  Cookies.set('GOOGLE_UID', google.user.uid, { secure: true, sameSite: 'strict', httpOnly: false, expires: 3 });
  
  Cookies.set('GOOGLE_DISPLAYNAME', google.user.displayName, { secure: true, sameSite: 'strict', httpOnly: false, expires: 3 });
  
  Cookies.set('GOOGLE_EMAIL', google.user.email, { secure: true, sameSite: 'strict', httpOnly: true, expires: 3 });
  
  Cookies.set('GOOGLE_PHOTOURL', google.user.photoURL, { secure: true, sameSite: 'strict', httpOnly: false, expires: 3 });
 
  }).catch((error) => console.log(error));
  
});

logEvent(analytics, 'page_view', {
  page_path: window.location.pathname,
  page_title: document.title,
  page_location: window.location.href,
  page_referrer: document.referrer,
  user_ip: Cookies.get('user_ip') || 'N/A', 
  user_id: Cookies.get('GOOGLE_DISPLAYNAME') || 'N/A', 
  user_language: navigator.language,
  user_agent: navigator.userAgent,
  user_platform: navigator.platform,
  site_version: 'v01.08.2024' 
});