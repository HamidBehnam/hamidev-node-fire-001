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

export const checkIfAuthenticated = async (request: Request, response: Response, next: NextFunction) => {

    const validationResult = validator(schema, request.headers);

    if (validationResult.valid) {

        if (request.headers.authorization) {

            const token = request.headers.authorization.split(' ')[1];

            try {

                response.locals.user = await adminAuth.verifyIdToken(token);

                next();
            } catch (error) {

                response.status(403).send();
            }
        }
    } else {

        response.status(400).send(validationResult.errors);
    }

};
