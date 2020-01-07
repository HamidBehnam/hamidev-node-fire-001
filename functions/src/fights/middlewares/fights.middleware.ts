import {Request, Response} from "firebase-functions";
import {NextFunction} from "express";
import {validator} from "../../common/services/validator.service";

const schemas = {
    "full": {
        "properties": {
            "winner": { "type": "string" },
            "loser": { "type": "string" },
            "title": { "type": "string" },
            "locations": {
                "type": "array",
                "items": {
                    "properties": {
                        "name": { "type": "string" },
                        "code": { "type": "number" }
                    },
                    "additionalProperties": false,
                    "required": [ "name", "code" ],
                },
                "minItems": 1
            }
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
        "additionalProperties": false,
        "minProperties": 1
    }
};

export const fullValidation = (request: Request, response: Response, next: NextFunction) => {

    const validationResult = validator(schemas.full, request.body);

    if (validationResult.valid) {

        next();
    } else {

        response.status(400).send(validationResult.errors);
    }
};

export const partialValidation = (request: Request, response: Response, next: NextFunction) => {

    const validationResult = validator(schemas.partial, request.body);

    if (validationResult.valid) {

        next();
    } else {

        response.status(400).send(validationResult.errors);
    }
};
