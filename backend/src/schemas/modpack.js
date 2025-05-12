const Ajv = require("ajv");
const ajv = new Ajv();

// --- Schemas ---
//TODO

const newModpackSchema = {
    type: 'object',
    properties: {
        name: { type: 'string'},
    },
    required: ['name'],
    additionalProperties: false
};

const validateNewModpackData = ajv.compile(newModpackSchema);


// --- Exports ---

module.exports = { validateNewModpackData };