"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.dbFileName = void 0;
// first import the modules
const sqlite3_1 = require("sqlite3");
const sqlite_1 = require("sqlite");
// then create & open the connection
exports.dbFileName = './data/car_luxury.db';
class DB {
    static createDBConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, sqlite_1.open)({
                filename: `./${exports.dbFileName}`,
                driver: sqlite3_1.Database
            });
            yield DB.ensureTableCreated(db); // Fix: Change method call from 'ensureTablesCreated' to 'ensureTableCreated'
            return db;
        });
    }
    static ensureTableCreated(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.run(`create table if not exists User(
            email text NOT NULL PRIMARY KEY,
            fullName TEXT NOT NULL,
            role text default 'user',
            password Text not null
            ) strict`);
        });
    }
}
exports.DB = DB;
