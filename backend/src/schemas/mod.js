const Ajv = require("ajv");
const ajv = new Ajv();

// --- Schemas ---
//TODO

const newModSchema = {
    type: 'object',
    properties: {
        name: { type: 'string'},
    },
    required: ['name'],
    additionalProperties: false
};

const validateNewModData = ajv.compile(newModSchema);


// --- Exports ---

module.exports = { validateNewModData };