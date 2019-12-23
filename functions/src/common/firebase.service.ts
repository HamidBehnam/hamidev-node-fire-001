import * as admin from 'firebase-admin';
import Firestore = FirebaseFirestore.Firestore;
import Auth = admin.auth.Auth;

admin.initializeApp();

export const db: Firestore = admin.firestore();

export const auth: Auth = admin.auth();
