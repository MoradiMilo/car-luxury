"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var user_store_1 = require("../data/user-store");
var app = (0, express_1.default)();
var authRouter = express_1.default.Router(); // Erstellung des Routers
// Weitere Konfiguration des authRouter, z.B. hinzufügen von Endpunkten
app.use("/api/auth", authRouter);
authRouter.get("/users", function (request, response) {
    response.status(http_status_codes_1.StatusCodes.OK).json(user_store_1.users);
});
exports.default = app; // Exportieren der Express-Anwendung, wenn nötig
