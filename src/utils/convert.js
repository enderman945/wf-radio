const marked = require("marked");

async function mdToHtml(md_content) {
    if (md_content) {
        return marked.parse(md_content);
    } else {
        return "";
    }
}

module.exports = { mdToHtml };