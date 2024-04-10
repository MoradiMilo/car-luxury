"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var bcrypt_1 = require("bcrypt"); // Importieren von bcrypt
// Überprüfen des Importvorgangs
if (!bcrypt_1.default) {
    console.error('bcrypt konnte nicht importiert werden.');
    process.exit(1); // Beenden Sie den Prozess mit einem Fehlercode
}
var saltRounds = 8;
// Erstellung von zwei vordefinierten Benutzern
exports.users = [
    {
        fullName: "Administrator",
        email: "admin@fruits.at",
        role: "admin",
        password: bcrypt_1.default.hashSync("pw4admin", saltRounds),
    },
    {
        fullName: "John Doe",
        email: "john@doe.at",
        role: "user",
        password: bcrypt_1.default.hashSync("pw4user", saltRounds),
    },
];
