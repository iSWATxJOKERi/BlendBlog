import { PassportStatic } from 'passport';
import passportJwt, { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { QueryResult } from 'pg';
import { User } from '../models/User';
const JwtStrategy = passportJwt.Strategy;

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
}

export default (passport: PassportStatic) => {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload);
            const user: QueryResult = await User.findById(jwt_payload.id);
            if(user.rows.length > 0) {
                return done(null, user.rows[0])
            }
            return done(null, false);
        } catch(e) {
            console.log(e)
        }
    }))
}