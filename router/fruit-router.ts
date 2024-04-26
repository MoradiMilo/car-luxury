import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import {users} from '../data/user-store';
import { isAuthenticated } from '../middleware/auth-handlers';

export const authRouter = express.Router();
export const SECRET_KEY = process.env.SECRET_KEY || '';


export interface UserCredentials {
    email: string;
    password: string;
    role?: string;
}
// return all users
authRouter.get("/users", isAuthenticated, (request, response) => {
    response.status(StatusCodes.OK).json(users);
   });


// Mock-Benutzerdaten - Ersetzen Sie dies durch Ihre tatsächliche Datenquelle


authRouter.post("/login", (request: Request, response: Response) => {
    const loginUser: UserCredentials = request.body;
    


    // Überprüfen, ob ein Benutzer mit der angegebenen E-Mail existiert
    const user = users.find(u => u.email === loginUser.email);
    

    if (!user) {
        response.status(StatusCodes.UNAUTHORIZED).json("Benutzer existiert nicht");
        return;
    }

    // Überprüfen, ob das eingegebene Passwort mit dem gehashten Passwort übereinstimmt
    if (!bcrypt.compareSync(loginUser.password, user.password)) {
        response.status(StatusCodes.UNAUTHORIZED).json("Falsches Passwort");
        return;
    }
    
    // Authentifizierung erfolgreich
    const userClaims = {
        email: user.email,
        role: user.role,
    };
    const minutes = 15;
    const expiresAt = new Date(Date.now() + minutes * 60000);
    const token = jwt.sign(
        {
            user: userClaims,
            exp: expiresAt.getTime() / 1000,
        },
        SECRET_KEY // Hier wird der tatsächliche Secret Key verwendet
    );

    response.status(StatusCodes.OK).json({
        userClaims: userClaims,
        expiresAt: expiresAt.getTime(),
        accessToken: token,
    });

});

export default authRouter;
