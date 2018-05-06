import firebase from 'firebase'

//Initialize Firebase
var config = {
    apiKey: "AIzaSyBAtM68V2G1J4jJD8xNO2L-1QtCgxBvHI4",
    authDomain: "bucknellforum.firebaseapp.com",
    databaseURL: "https://bucknellforum.firebaseio.com",
    projectId: "bucknellforum",
    storageBucket: "bucknellforum.appspot.com",
    messagingSenderId: "1001058855464"
  };
  firebase.initializeApp(config);

  export default firebase;
