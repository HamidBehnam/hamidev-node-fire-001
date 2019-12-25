import {Request, Response} from "firebase-functions";
import {NextFunction} from "express";
import {validator} from "../../common/services/validator.service";

const schema = {
    "properties": {
        "email": { "type": "string" },
        "password": { "type": "string" }
    },
    "additionalProperties": false,
    "required": [ "email", "password" ]
};

export const loginValidation = (request: Request, response: Response, next: NextFunction) => {

    const validationResult = validator(schema, request.body);

    if (validationResult.valid) {

        next();
    } else {

        response.status(400).send(validationResult.errors);
    }
};
