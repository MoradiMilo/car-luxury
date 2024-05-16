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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("./database");
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
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database_1.DB.createDBConnection();
    exports.users = yield db.all('select * from User');
    console.log(exports.users);
    yield db.close();
}), 0);
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield database_1.DB.createDBConnection();
            const stmt = yield db.prepare('insert into User (email, fullname, role, password) values (?1,?2,?3,?4)');
            yield stmt.bind({ 1: user.email, 2: user.fullName, 3: user.role, 4: user.password });
            const operationResult = yield stmt.run();
            yield stmt.finalize();
            yield db.close();
            if (operationResult === undefined) {
                return false;
            }
        }
        catch (error) {
            console.error(error);
            return false;
        }
        return true;
    });
}
console.log(exports.users);
