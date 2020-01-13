export const commonSchemas = {
    "auth": {
        "properties": {
            "authorization": {
                "type": "string",
                "pattern": "Bearer "
            }
        },
        "additionalProperties": true,
        "required": [ "authorization" ]
    }
};
