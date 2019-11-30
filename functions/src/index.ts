import express = require("express");
import functions = require("firebase-functions");
import * as admin from 'firebase-admin';
import {Application} from "express";
import {HttpsFunction, Request, Response} from "firebase-functions";
import QuerySnapshot = FirebaseFirestore.QuerySnapshot;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import DocumentReference = FirebaseFirestore.DocumentReference;
import DocumentData = FirebaseFirestore.DocumentData;
import Firestore = FirebaseFirestore.Firestore;
import QueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;


admin.initializeApp(functions.config().firebase);

const db: Firestore = admin.firestore();
const app: Application = express();
const main: Application = express();

main.use('/api/v1', app);

export const webApi: HttpsFunction = functions.https.onRequest(main);

app.post('/fights', async (request: Request, response: Response) => {
    try {
        const {winner, loser, title} = request.body;

        const data = {
            winner,
            loser,
            title
        };

        const fightRef: DocumentReference = await db.collection('fights').add(data);
        const fightSnapshot: DocumentSnapshot = await fightRef.get();

        response.status(201).send({
            id: fightSnapshot.id,
            data: fightSnapshot.data()
        });
    } catch (error) {

        response.status(500).send(error);
    }
});

// const myHandler = (collection: string, param: string) => {
//     return async (request: Request, response: Response, next: NextFunction) => {
//         const doc = await db.collection(collection).doc(request.params[param]).get();
//         if (doc.exists) {
//             next();
//         } else {
//             response.status(500).send('The requested document does not exist!');
//         }
//     };
// };

app.get('/fights/:id', async (request: Request, response: Response) => {
    try {
        const fightId: string = request.params.id;

        const fightSnapshot: DocumentSnapshot = await db.collection('fights').doc(fightId).get();

        if (fightSnapshot.exists) {

            response.status(200).send({
                ...fightSnapshot.data(),
                id: fightSnapshot.id
            });
        } else {

            response.status(404).send('The fight does not exists');
        }

    } catch (error) {

        response.status(500).send(error);
    }
});

app.get('/fights', async (request: Request, response: Response) => {
    try {

        const fightsQuerySnapshot: QuerySnapshot = await db.collection('fights').get();
        const fights: DocumentData[] = fightsQuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            ...doc.data(),
            id: doc.id
        }));

        response.status(200).send(fights);
    } catch (error) {

        response.status(500).send(error);
    }
});

app.patch('/fights/:id', async (request: Request, response: Response) => {
    try {
        const fightId: string = request.params.id;

        const fightRef: DocumentReference = db.collection('fights').doc(fightId);
        await fightRef.update(request.body);
        // update vs set? set creates a new document if the provided id does not exist also
        // it completely replaces the document if we don't use { merge: true } as the option.
        // update returns an error if the provided id doesn't exist and it doesn't replace the entire document.

        const updatedFightSnapshot: DocumentSnapshot = await fightRef.get();
        response.status(200).send({
            ...updatedFightSnapshot.data(),
            id: updatedFightSnapshot.id
        });
    } catch (error) {

        response.status(500).send(error);
    }
});

app.put('/fights/:id', async (request: Request, response: Response) => {
    try {
        const fightId: string = request.params.id;

        const fightRef: DocumentReference = db.collection('fights').doc(fightId);
        const fightSnapshot: DocumentSnapshot = await fightRef.get();

        if (fightSnapshot.exists) {

            await fightRef.set(request.body);
            const updatedFightSnapshot: DocumentSnapshot = await fightRef.get();
            response.status(200).send({
                ...updatedFightSnapshot.data(),
                id: updatedFightSnapshot.id
            });
        } else {

            response.status(404).send('The requested fight does not exist.');
        }

    } catch (error) {

        response.status(500).send(error);
    }
});

app.delete('/fights/:id', async (request: Request, response: Response) => {
    try {
        const fightId: string = request.params.id;

        const fightRef: DocumentReference = db.collection('fights').doc(fightId);
        const fightSnapshot: DocumentSnapshot = await fightRef.get();

        if (fightSnapshot.exists) {

            await fightRef.delete();
            response.status(201).send('Fight was successfully deleted.');
        } else {

            response.status(404).send('The requested document does not exist.');
        }

    } catch (error) {

        response.status(500).send(error);
    }
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
