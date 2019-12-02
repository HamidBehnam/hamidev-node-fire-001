import * as Ajv from "ajv";
import {Request, Response} from "firebase-functions";
import {NextFunction} from "express";

const ajv = new Ajv();

const schemas = {
    "full": {
        "properties": {
            "winner": { "type": "string" },
            "loser": { "type": "string" },
            "title": { "type": "string" }
        },
        "additionalProperties": false,
        "required": [ "winner", "loser", "title" ]
    },
    "partial": {
        "properties": {
            "winner": { "type": "string" },
            "loser": { "type": "string" },
            "title": { "type": "string" }
        },
        "additionalProperties": false
    }
};

const validator = (request: Request, response: Response, next: NextFunction, schema: any, data: any) => {

    const valid = ajv.validate(schema, data);

    if (valid) {

        next();
    } else {

        response.status(400).send(ajv.errors);
    }
};

export const fullValidation = (request: Request, response: Response, next: NextFunction) => {

    validator(request, response, next, schemas.full, request.body);
};

export const partialValidation = (request: Request, response: Response, next: NextFunction) => {

    validator(request, response, next, schemas.partial, request.body);
};
