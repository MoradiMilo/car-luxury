require('dotenv').config();
import express from 'express';
import { authRouter } from '../router/fruit-router'; // Stellen Sie sicher, dass Sie den richtigen Pfad angeben
import { StatusCodes } from 'http-status-codes';
import { users } from '../data/user-store'; // Stellen Sie sicher, dass Sie den richtigen Pfad angeben

const app = express();



const PORT = 8080;

app.use(express.json());

// Registrieren Sie den authRouter für Express
app.use("/api/auth", authRouter);

// Route zum Abrufen aller Benutzerdaten, geschützt durch die isAdmin-Middleware
authRouter.get("/users", (request, response) => {
    response.status(StatusCodes.OK).json(users);
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
