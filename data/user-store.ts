import bcrypt from "bcrypt";
const saltRounds = 8;

export const users: User[] = [
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

