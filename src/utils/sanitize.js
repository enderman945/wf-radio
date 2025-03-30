const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

// Initialize
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

async function sanitizeText(text) {
    return DOMPurify.sanitize(text);
}

async function sanitizeModData(mod_data) {
    mod_data.displayName = await sanitizeText(mod_data.displayName);
    mod_data.otherInfos.description = await sanitizeText(mod_data.otherInfos.description);
    mod_data.otherInfos.changelogs = await sanitizeText(mod_data.otherInfos.changelogs);
}

module.exports = { sanitizeText, sanitizeModData };