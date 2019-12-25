import {Request, Response} from "firebase-functions";
import {NextFunction} from "express";
import {validator} from "../services/validator.service";
import * as firebaseClient from "firebase";
import UserCredential = firebaseClient.auth.UserCredential;
import {adminAuth, clientAuth} from "../services/firebase.service";

const schema = {
    "properties": {
        "authorization": {
            "type": "string",
            "pattern": "Bearer "
        }
    },
    "additionalProperties": true,
    "required": [ "authorization" ]
};

export const checkIfAuthenticated = (request: Request, response: Response, next: NextFunction) => {

    const validationResult = validator(schema, request.headers);

    if (validationResult.valid) {

        if (request.headers.authorization) {

            const token = request.headers.authorization.split(' ')[1];

            if (token === 'hamid') {

                clientAuth.signInWithEmailAndPassword('sdf6@sdf6.com', 'forthis').then((user: UserCredential) => {
                    if (user && user.user) {
                        user.user.getIdToken(true).then(async (token2) => {

                            const theObtainedUser = await adminAuth.verifyIdToken(token2);

                            response.locals.user = theObtainedUser;
                            console.log(theObtainedUser);
                        });
                    }
                });

                next();
            } else {

                response.status(403).send();
            }
        }
    } else {

        response.status(400).send(validationResult.errors);
    }

};
