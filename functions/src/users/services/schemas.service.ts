export const usersSchemas = {
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
