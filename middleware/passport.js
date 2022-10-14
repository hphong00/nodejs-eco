const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../models/user.model');

const jwtOptions = {
  secretOrKey: 'phonghuynh1',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
};

const jwtGoogleOptions = {
  clientID:
    '626881250183-dj6nv976pbll5vbnmmad8iu5hopo8odr.apps.googleusercontent.com',
  clientSecret: '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',
};

const jwtFacebookOptions = {
  clientID: 'auth.facebook.CLIENT_ID',
  clientSecret: 'auth.facebook.CLIENT_SECRET',
};

const jwtLocalOptions = {
  usernameField: 'email',
};

// Passport api
const jwtVerify = async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

// Passport Google
const jwtGoogleVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    // console.log("accessToken ", accessToken);
    // console.log("refreshToken ", refreshToken);
    // console.log("profile ", profile);

    if (!accessToken) {
      return done(null, false);
    }
    const username = profile.name.givenName + profile.name.familyName;
    const user = await User.findOne({
      username: username,
      email: profile.emails[0].value,
    });
    if (user) {
      return done(null, user);
    } else {
      const newUser = new User({
        authLogin: 'Google',
        email: profile.emails[0].value,
        username: username,
        password: username,
      });
      console.log(newUser);
      await newUser.save();
      done(null, newUser);
    }
  } catch (error) {
    console.log('error ', error);
    done(error, false);
  }
};

// Passport Facebook
const jwtFacebookVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('accessToken ', accessToken);
    console.log('refreshToken ', refreshToken);
    console.log('profile ', profile);

    // check whether this current user exists in our database
    const user = await User.findOne({
      authFacebookID: profile.id,
      authType: 'google',
    });

    if (user) return done(null, user);

    // If new account
    const newUser = new User({
      authType: 'facebook',
      authFacebookID: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
    });

    await newUser.save();

    done(null, newUser);
  } catch (error) {
    console.log('error ', error);
    done(error, false);
  }
};

// Passport local
const jwtLocalVerify = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) return done(null, false);

    const isCorrectPassword = await user.isValidPassword(password);

    if (!isCorrectPassword) return done(null, false);

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const jwtGoogleStrategy = new GooglePlusTokenStrategy(
  jwtGoogleOptions,
  jwtGoogleVerify,
);
const jwtFacebookStrategy = new FacebookTokenStrategy(
  jwtFacebookOptions,
  jwtFacebookVerify,
);
const jwtLocalStrategy = new LocalStrategy(jwtLocalOptions, jwtLocalVerify);

module.exports = {
  jwtStrategy,
  jwtGoogleStrategy,
  jwtFacebookStrategy,
  jwtLocalStrategy,
};
