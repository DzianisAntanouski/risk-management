sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sample.controller.Report", {
            onInit: function () {
                this.oSocket = new WebSocket(`wss://port4004-workspaces-ws-vn2v6.us10.trial.applicationstudio.cloud.sap/socket`);
                this.oSocket.onmessage = (oEvent) => {
                    this.byId("input").setValue(oEvent.data)
                }
            },

            onInputChange: function (oEvent) {
                const data = {
                    id: Date.now(),
                    msg: oEvent.getSource().getValue()
                }
                this.oSocket.send(JSON.stringify(data))
            }
        });
    });
