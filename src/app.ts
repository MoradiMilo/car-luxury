import express, { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { users } from '../data/user-store';

const app = express();
const authRouter: Router = express.Router(); // Erstellung des Routers

// Weitere Konfiguration des authRouter, z.B. hinzufügen von Endpunkten

app.use("/api/auth", authRouter);

authRouter.get("/users", (request: Request, response: Response) => {
    response.status(StatusCodes.OK).json(users);
});

export default app; // Exportieren der Express-Anwendung, wenn nötig
