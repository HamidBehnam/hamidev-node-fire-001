import {Request, Response} from "firebase-functions";
import {NextFunction} from "express";
import {validate} from "../services/validate.service";
import {adminAuth} from "../services/firebase.service";
import {ValidationDataSource} from "../services/constants.service";


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
