import {Request, Response} from "firebase-functions";
import {NextFunction} from "express";
import {validator} from "../services/validator.service";
import {adminAuth} from "../services/firebase.service";

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

export const authValidation = (request: Request, response: Response, next: NextFunction) => {

    const validationResult = validator(schema, request.headers);

    if (validationResult.valid) {

        next();
    } else {

        response.status(400).send(validationResult.errors);
    }
};

export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {

    if (request.headers.authorization) {

        const token = request.headers.authorization.split(' ')[1];

        try {

            response.locals.user = await adminAuth.verifyIdToken(token, true);

            next();
        } catch (error) {

            response.status(403).send();
        }
    }
};

export const isAuthorized = (acceptedRoles: string[]) => {
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
