const Ajv = require("ajv");
const ajv = new Ajv();

// --- Schemas ---
//TODO

const newUserSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        password: { type: 'string', minLength: 3, maxLength: 30 },
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false
};

const validateNewUserData = ajv.compile(newUserSchema);


// --- Exports ---

module.exports = { validateNewUserData };