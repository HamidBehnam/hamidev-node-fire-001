import {Request, Response} from "firebase-functions";
import {NextFunction} from "express";
import {validate} from "../services/validate.service";
import {adminAuth, db} from "../services/firebase.service";
import {ValidationDataSource} from "../services/constants.service";
import * as firebaseAdmin from "firebase-admin";
import DocumentReference = firebaseAdmin.firestore.DocumentReference;
import FieldValue = firebaseAdmin.firestore.FieldValue;
import DocumentSnapshot = firebaseAdmin.firestore.DocumentSnapshot;


export const validator = (schema: any, dataSource?: ValidationDataSource) => {

    return (request: Request, response: Response, next: NextFunction) => {

        let validationDataSource;

        switch (dataSource) {
            case ValidationDataSource.Headers:
                validationDataSource = request.headers;
                break;
            case ValidationDataSource.Body:
            default:
                validationDataSource = request.body;
                break;
        }

        const validationResult = validate(schema, validationDataSource);

        if (validationResult.valid) {

            next();
        } else {

            response.status(400).send(validationResult.errors);
        }
    };
};

export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {

    if (request.headers.authorization) {

        const token = request.headers.authorization.split(' ')[1];

        try {

            response.locals.user = await adminAuth.verifyIdToken(token, true);

            const userLastActivityRef: DocumentReference = db.collection('last-activities').doc(response.locals.user.uid);
            const userLastActivitySnapshot: DocumentSnapshot = await userLastActivityRef.get();

            if (userLastActivitySnapshot.exists) {
                const lastActivityData = userLastActivitySnapshot.data();

                if (lastActivityData) {

                    console.log(lastActivityData.lastRequest);
                }
            } else {
                await userLastActivityRef.set({
                    lastRequest: FieldValue.serverTimestamp()
                });
            }

            next();
        } catch (error) {

            response.status(403).send();
        }
    }
};

export const resourceLevelAuthorization = (acceptedRoles: string[]) => {
    return (request: Request, response: Response, next: NextFunction) => {

        let authorized = false;

        for (const role of acceptedRoles) {
            if (response.locals.user[role]) {
                authorized = true;
                break;
            }
        }

        authorized ? next() : response.status(403).send();
    };
};
