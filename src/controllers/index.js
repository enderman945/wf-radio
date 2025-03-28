async function helloWorld(req, res) {
    try {
        const query_result = "Hello there!";
        res.send(query_result);
    } catch (error) {
        console.debug("Error at HelloWorld controller");
        res.status(500).json({ error: error.message });
    }
}

module.exports = { helloWorld };
