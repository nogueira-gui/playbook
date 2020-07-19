import firebase from 'firebase';

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBehS8v4vgJVodmDvHPXyVow0DoOdwFgUM",
    authDomain: "playbook-fccbc.firebaseapp.com",
    databaseURL: "https://playbook-fccbc.firebaseio.com",
    projectId: "playbook-fccbc",
    storageBucket: "playbook-fccbc.appspot.com",
    messagingSenderId: "588278471693",
    appId: "1:588278471693:web:e5ba6a3b1757e75319c944"
};
  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);