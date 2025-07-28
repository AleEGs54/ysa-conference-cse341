const GithubStrategy = require('passport-github2');
const User = require('../models/users');
require('dotenv').config();

module.exports = function (passport) {
    passport.use(
        new GithubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL,
            },
            async function (accessToken, refreshToken, profile, done) {
                try {
                    console.log('🚀 ~ passport.js:15 ~ profile:', profile);

                    const user = await User.findOne({ githubId: profile.id });

                    if (!user) {
                        const newUser = await User.create({
                            githubId: profile.id,
                            name: profile.displayName,
                            username: profile.username,
                            email: profile.email,
                        });

                        //Passport stores this user to use in future interactions
                        return done(null, newUser);
                    }
                    return done(null, user);
                } catch (err) {
                    console.error('Error in GitHub strategy callback:', err);
                    return done(err, null);
                }
            },
        ),
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
};
