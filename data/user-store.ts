import bcrypt from 'bcrypt'; // Importieren von bcrypt

// Überprüfen des Importvorgangs
if (!bcrypt) {
    console.error('bcrypt konnte nicht importiert werden.');
    process.exit(1); // Beenden Sie den Prozess mit einem Fehlercode
}

const saltRounds = 8;

// Erstellung der Benutzerdaten
export interface User {
    email: string;
    password: string;
    fullName: string;
    role: string;
}

// Erstellung von zwei vordefinierten Benutzern
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
