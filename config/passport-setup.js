const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("./../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ profile: profile.id }).then(currentUser => {
        if (currentUser) {
          done(null, currentUser);
        }
        return new User({
          username: profile.displayName,
          googleId: profile.id
        })
          .save()
          .then(theUser => {
            done(null, theUser);
          });
      });
    }
  )
);
