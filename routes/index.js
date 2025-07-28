const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) =>
    /* #swagger.ignore = true */
    res.send(
        //If user is logged in, display name. 'user' comes from 'done(null, user)'
        req.session.user !== undefined
            ? `Logged in as ${req.session.user.name}`
            : 'Logged Out',
    ),
);

router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: false,
    }),
    (req, res) => {
        /* #swagger.ignore = true */
        req.session.user = req.user;
        res.redirect('/');
    },
);

router.get('/login', passport.authenticate('github'), (req, res) => {
    /* #swagger.ignore = true */
});
router.get('/logout', function (req, res, next) {
    /* #swagger.ignore = true */
    req.logout((err) => {
        //If logout fails, go to err middleware
        if (err) {
            next(err);
            return;
        }
        //else, correctly redirect
        res.redirect('/');
    });
});

router.use('/participants', require('./participants'));
router.use('/users', require('./users'));
router.use('/api-docs', require('./swagger'));

module.exports = router;
