export const fightsSchemas = {
    "fight": {
        "full": {
            "properties": {
                "winner": { "type": "string" },
                "loser": { "type": "string" },
                "title": { "type": "string" },
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
    },
    "location": {
        "full": {
            "properties": {
                "name": { "type": "string" },
                "code": { "type": "number" }
            },
            "additionalProperties": false,
            "required": [ "name", "code" ],
        },
        "partial": {
            "properties": {
                "name": { "type": "string" },
                "code": { "type": "number" }
            },
            "additionalProperties": false,
            "minProperties": 1
        }
    },
    "permission": {
        "properties": {
            "uid": { "type": "string" },
            "permission": {
                "type": "object",
                "properties": {
                    "role": { "enum": [2000, 3000, 4000] }
                },
                "additionalProperties": false,
                "required": [ "role" ]
            },
        },
        "additionalProperties": false,
        "required": [ "uid", "permission" ]
    }
};
