"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const user_store_1 = require("../data/user-store");
const auth_handlers_1 = require("../middleware/auth-handlers");
exports.authRouter = express_1.default.Router();
exports.SECRET_KEY = process.env.SECRET_KEY || '';
// return all users
exports.authRouter.get("/users", auth_handlers_1.isAuthenticated, (request, response) => {
    response.status(http_status_codes_1.StatusCodes.OK).json(user_store_1.users);
});
// Mock-Benutzerdaten - Ersetzen Sie dies durch Ihre tatsächliche Datenquelle
exports.authRouter.post("/login", (request, response) => {
    const loginUser = request.body;
    // Überprüfen, ob ein Benutzer mit der angegebenen E-Mail existiert
    const user = user_store_1.users.find(u => u.email === loginUser.email);
    if (!user) {
        response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json("Benutzer existiert nicht");
        return;
    }
    // Überprüfen, ob das eingegebene Passwort mit dem gehashten Passwort übereinstimmt
    if (!bcrypt_1.default.compareSync(loginUser.password, user.password)) {
        response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json("Falsches Passwort");
        return;
    }
    // Authentifizierung erfolgreich
    const userClaims = {
        email: user.email,
        role: user.role,
    };
    const minutes = 15;
    const expiresAt = new Date(Date.now() + minutes * 60000);
    const token = jsonwebtoken_1.default.sign({
        user: userClaims,
        exp: expiresAt.getTime() / 1000,
    }, exports.SECRET_KEY // Hier wird der tatsächliche Secret Key verwendet
    );
    response.status(http_status_codes_1.StatusCodes.OK).json({
        userClaims: userClaims,
        expiresAt: expiresAt.getTime(),
        accessToken: token,
    });
});
exports.default = exports.authRouter;
