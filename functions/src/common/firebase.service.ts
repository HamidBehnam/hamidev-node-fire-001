import * as admin from 'firebase-admin';
import functions = require("firebase-functions");
import Firestore = FirebaseFirestore.Firestore;

admin.initializeApp(functions.config().firebase);

export const db: Firestore = admin.firestore();

export const fireAdmin = admin;
