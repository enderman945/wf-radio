const Ajv = require("ajv");
const ajv = new Ajv();

// --- Schemas ---

const AuthUserSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 3, maxLength: 30 },
    },
    required: ['email', 'password'],
    additionalProperties: false
};

const validateAuthUserData = ajv.compile(AuthUserSchema);


// --- Exports ---

module.exports = { validateAuthUserData, validateAuthNodeData };