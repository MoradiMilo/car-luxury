"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    console.log(req);
    next();
};
exports.isAuthenticated = isAuthenticated;
