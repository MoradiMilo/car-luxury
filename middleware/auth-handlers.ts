import { Request, Response, NextFunction } from 'express';
import jwt,{JwtPayload} from 'jsonwebtoken';
import { SECRET_KEY } from '../router/fruit-router';


// Definition der benutzerdefinierten Anforderungsschnittstelle
export interface AuthRequest extends Request {
    payload?: JwtPayload;
}

// Middleware zur Authentifizierung und Überprüfung des JWT
export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Extrahieren Sie den JWT aus dem Authorization-Header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error("No bearer token available");
        }
        // Überprüfen Sie, ob der Token gültig ist
        req.payload = jwt.verify(token, SECRET_KEY) as JwtPayload;
        next();
    } catch (err) {
        res.status(401).send(`Please authenticate! ${err}`);
    }
};

// Middleware zur Überprüfung der Adminberechtigung
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Überprüfen Sie, ob die Benutzerrolle "admin" ist
        if (req.payload && req.payload.role === "admin") {
            next();
        } else {
            res.status(401).send("Admin role required");
        }
    } catch (err) {
        res.status(401).send("Authentication required");
    }
};
