const cds = require("@sap/cds");

cds.on("bootstrap", async (app) => {

    var expressWs = require("express-ws")(app);
    app.ws("/socket", async (ws, res) => {
        console.log()
        ws.on("message", (msg) => {
            message = JSON.parse(msg);
            ws.id = message.id;
            sendMsgToAllClients(message);
        });
    });
    function sendMsgToAllClients(message) {
        expressWs.getWss().clients.forEach((client) => {
            if (client.id != message.id) {
                client.send(message.msg);
            }
        });
    }
});

module.exports = cds.server;
