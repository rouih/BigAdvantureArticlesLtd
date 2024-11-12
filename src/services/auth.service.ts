import { injectable } from "tsyringe";
import { IAuthService } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";

@injectable()
export class AuthService implements IAuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

    generateToken(userName: string): string {
        return jwt.sign({ userName }, this.JWT_SECRET, { expiresIn: '1h' });
    }


}