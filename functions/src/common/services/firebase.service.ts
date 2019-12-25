import * as firebaseAdmin from 'firebase-admin';
import * as firebaseClient from "firebase";
import AdminAuth = firebaseAdmin.auth.Auth;
import ClientAuth = firebaseClient.auth.Auth;
import Firestore = FirebaseFirestore.Firestore;

const firebaseClientConfig = {
    apiKey: "AIzaSyDhUFOOiURSqogYhwZkvK867YNTcY10D2w",
    authDomain: "hamidev-node-fire-001.firebaseapp.com",
    databaseURL: "https://hamidev-node-fire-001.firebaseio.com",
    projectId: "hamidev-node-fire-001",
    storageBucket: "hamidev-node-fire-001.appspot.com",
    messagingSenderId: "869423530248",
    appId: "1:869423530248:web:5ef068a558d6940cd06cbd",
    measurementId: "G-8KPMZWJJQ9"
};

firebaseClient.initializeApp(firebaseClientConfig);

firebaseAdmin.initializeApp();

export const db: Firestore = firebaseAdmin.firestore();

export const adminAuth: AdminAuth = firebaseAdmin.auth();

export const clientAuth: ClientAuth = firebaseClient.auth();
