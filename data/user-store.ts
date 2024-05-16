import bcrypt from "bcrypt";
import { DB } from "./database";

const saltRounds = 8;

export let users: User[] = [
    {
        fullName: "Administrator",
        email: "admin@fruits.at",
        role: "admin",
        password: bcrypt.hashSync("pw4admin", saltRounds),
    },
    {
        fullName: "John Doe",
        email: "john@doe.at",
        role: "user",
        password: bcrypt.hashSync("pw4user", saltRounds),
    },
];


export interface User {
    email: string;
    password: string;
    fullName: string;
    role: string;
}

setTimeout(async () => {
    const db = await DB.createDBConnection();
    const users = await db.all<User[]>('select * from User');
    console.log(users);

    await db.close();
}, 0)

console.log(users);

async function createUser(user: User): Promise<boolean> {
    try {
        users.push(user);
        //toDo: persist user in database

        const db = await DB.createDBConnection();
        const stmt = await db.prepare('insert into User (email, fullName, role, password) values (?1,?2,?3,?4)');
        await stmt.bind({ 1: user.email, 2: user.fullName, 3: user.role, 4: user.password });
        const operationResult = await stmt.run();
        await stmt.finalize();
        await db.close();
        if (operationResult === undefined) {
            return false;
        }

    } catch (error) {
        console.error(error);
        return false;
    }

    return true;
}

