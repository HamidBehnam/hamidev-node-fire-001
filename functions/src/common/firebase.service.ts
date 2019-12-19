import * as admin from 'firebase-admin';
import functions = require("firebase-functions");
import Firestore = FirebaseFirestore.Firestore;
import Auth = admin.auth.Auth;

admin.initializeApp(functions.config().firebase);

export const db: Firestore = admin.firestore();

export const auth: Auth = admin.auth();
