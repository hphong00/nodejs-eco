const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

// Passport Jwt
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Token'),
      secretOrKey: 'phonghuynh1',
    },
    async (payload, done) => {
      try {
        console.log('payload', payload);
        const user = await User.findById(payload.id);

        if (!user) return done(null, false);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

// const oAuth = (service) => async (token, done) => {
//   try {
//     const userData = await authProviders[service](token);
//     const user = await User.oAuthLogin(userData);
//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// };

// exports.jwt = new jwtStrategy(jwtOptions, jwt);
// exports.facebook = new bearerStrategy(oAuth("facebook"));
// exports.google = new bearerStrategy(oAuth("google"));
