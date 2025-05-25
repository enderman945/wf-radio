const Ajv = require("ajv");
const addFormats = require("ajv-formats")
const ajv = new Ajv({formats: {email: true}});

// --- Schemas ---
//TODO

const newUserSchema = {
    type: 'object',
    properties: {
        username: { type: 'string' }, //TODO
        display_name: { type: 'string'},
        email: { type: 'string', format: 'email' }, //TODO
        password: { type: 'string', minLength: 6, maxLength: 255 },
        profile_picture: {type: 'string'} //TODO
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false
};

addFormats(ajv, ['email']);
const validateNewUserData = ajv.compile(newUserSchema);


// --- Exports ---

module.exports = { validateNewUserData };