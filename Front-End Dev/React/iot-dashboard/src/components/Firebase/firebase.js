import React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/database';


const firebaseConfig = {
  apiKey: "INSERT_API_KEY_HERE",
  authDomain: "INSERT_AUTH_DOMAIN_HERE",
  databaseURL: "https://iot-beacon-collection.firebaseio.com",
  projectId: "INSERT_PROJECT_ID_HERE",
  storageBucket: "INSERT_STORAGE_BUCKET_HERE",
  messagingSenderId: "INSERT_MESSAGING_SEDER_ID_HERE",
  appId: "INSERT_APP_ID_HERE",
  measurementId: "INSERT_MEASUREMENT_ID_HERE"
};
firebase.initializeApp(firebaseConfig);


