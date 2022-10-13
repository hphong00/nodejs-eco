const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');
// const LocalStrategy = require("passport-local").Strategy;
// const GooglePlusTokenStrategy = require("passport-google-plus-token");
// const FacebookTokenStrategy = require('passport-facebook-token');
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
// Passport Google
// passport.use(
//   new GooglePlusTokenStrategy(
//     {
//       clientID: auth.google.CLIENT_ID,
//       clientSecret: auth.google.CLIENT_SECRET,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         console.log("accessToken ", accessToken);
//         console.log("refreshToken ", refreshToken);
//         console.log("profile ", profile);
//         // check whether this current user exists in our database
//         const user = await User.findOne({
//           authGoogleID: profile.id,
//           authType: "google",
//         });

//         if (user) return done(null, user);

//         // If new account
//         const newUser = new User({
//           authType: "google",
//           authGoogleID: profile.id,
//           email: profile.emails[0].value,
//           firstName: profile.name.givenName,
//           lastName: profile.name.familyName,
//         });

//         await newUser.save();

//         done(null, newUser);
//       } catch (error) {
//         console.log("error ", error);
//         done(error, false);
//       }
//     }
//   )
// );

// // Passport Facebook
// passport.use(
//   new FacebookTokenStrategy(
//     {
//       clientID: auth.facebook.CLIENT_ID,
//       clientSecret: auth.facebook.CLIENT_SECRET,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // check whether this current user exists in our database
//         const user = await User.findOne({
//           authFacebookID: profile.id,
//           authType: "google",
//         });

//         if (user) return done(null, user);

//         // If new account
//         const newUser = new User({
//           authType: "facebook",
//           authFacebookID: profile.id,
//           email: profile.emails[0].value,
//           firstName: profile.name.givenName,
//           lastName: profile.name.familyName,
//         });

//         await newUser.save();

//         done(null, newUser);
//       } catch (error) {
//         console.log("error ", error);
//         done(error, false);
//       }
//     }
//   )
// );

// // Passport local
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//     },
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });

//         if (!user) return done(null, false);

//         const isCorrectPassword = await user.isValidPassword(password);

//         if (!isCorrectPassword) return done(null, false);

//         done(null, user);
//       } catch (error) {
//         done(error, false);
//       }
//     }
//   )
// );
// exports.jwt = new jwtStrategy(jwtOptions, jwt);
// exports.facebook = new bearerStrategy(oAuth("facebook"));
// exports.google = new bearerStrategy(oAuth("google"));
