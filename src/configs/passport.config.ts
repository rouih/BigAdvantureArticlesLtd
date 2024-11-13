import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserModel from "../models/user.model";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "default_secret_key",
};

// Local Strategy for username/password login
passport.use(new LocalStrategy(
    UserModel.authenticate()
));

passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
            const userId = await UserModel.findOne({ userId: jwtPayload.userId }).exec();
            const user = await UserModel.findById(userId);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);


export { passport };
