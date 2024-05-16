"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fruit_router_1 = require("../router/fruit-router");
// Middleware zur Authentifizierung und Überprüfung des JWT
const isAuthenticated = (req, res, next) => {
    var _a;
    try {
        // Extrahieren Sie den JWT aus dem Authorization-Header
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error("No bearer token available");
        }
        // Überprüfen Sie, ob der Token gültig ist
        req.payload = jsonwebtoken_1.default.verify(token, fruit_router_1.SECRET_KEY);
        next();
    }
    catch (err) {
        res.status(401).send(`Please authenticate! ${err}`);
    }
};
exports.isAuthenticated = isAuthenticated;
// Middleware zur Überprüfung der Adminberechtigung
const isAdmin = (req, res, next) => {
    try {
        // Überprüfen Sie, ob die Benutzerrolle "admin" ist
        if (req.payload && req.payload.role === "admin") {
            next();
        }
        else {
            res.status(401).send("Admin role required");
        }
    }
    catch (err) {
        res.status(401).send("Authentication required");
    }
};
exports.isAdmin = isAdmin;
