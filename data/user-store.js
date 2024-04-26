"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 8;
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
