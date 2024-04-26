"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const fruit_router_1 = require("../router/fruit-router"); // Stellen Sie sicher, dass Sie den richtigen Pfad angeben
const http_status_codes_1 = require("http-status-codes");
const user_store_1 = require("../data/user-store"); // Stellen Sie sicher, dass Sie den richtigen Pfad angeben
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
// Registrieren Sie den authRouter für Express
app.use("/api/auth", fruit_router_1.authRouter);
// Route zum Abrufen aller Benutzerdaten, geschützt durch die isAdmin-Middleware
fruit_router_1.authRouter.get("/users", (request, response) => {
    response.status(http_status_codes_1.StatusCodes.OK).json(user_store_1.users);
});
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
