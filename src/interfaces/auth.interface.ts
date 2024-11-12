import jwt from "jsonwebtoken";

export interface IAuthService {
    generateToken(userName: string): string;
}