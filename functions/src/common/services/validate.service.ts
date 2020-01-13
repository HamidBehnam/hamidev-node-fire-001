import * as Ajv from "ajv";

const ajv = new Ajv();

export const validate = (schema: any, data: any) => {

    return {
        valid: ajv.validate(schema, data),
        errors: ajv.errors
    };
};
