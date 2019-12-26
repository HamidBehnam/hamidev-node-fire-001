import {Request, Response} from "firebase-functions";
import {NextFunction} from "express";
import {validator} from "../../common/services/validator.service";

const schemas = {
    "login": {
        "properties": {
            "email": { "type": "string" },
            "password": { "type": "string" }
        },
        "additionalProperties": false,
        "required": [ "email", "password" ]
    },
    "access": {
        "properties": {
            "uid": { "type": "string" },
            "access": {
                "properties": {
                    "admin": { "type": "boolean" },
                },
                "additionalProperties": false,
                "required": [ "admin" ]
            },
        },
        "additionalProperties": false,
        "required": [ "uid", "access" ]
    }
};

export const signInValidation = (request: Request, response: Response, next: NextFunction) => {

    const validationResult = validator(schemas.login, request.body);

    if (validationResult.valid) {

        next();
    } else {

        response.status(400).send(validationResult.errors);
    }
};

export const accessValidation = (request: Request, response: Response, next: NextFunction) => {

    const validationResult = validator(schemas.access, request.body);

    if (validationResult.valid) {

        next();
    } else {

        response.status(400).send(validationResult.errors);
    }

};
