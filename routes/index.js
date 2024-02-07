const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/groupA', require ('./groupA'));
router.use('/groupB', require ('./groupB'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logOut(function(err) {
    if (err) { return next(err); } 
    res.redirect('/');
    });
});
//router.get('/', (req, res) => { res.send('Hello Brother Porter :)');});
/*router.get('/', (req, res) => {
    res.send('Hello Brother Porter and graders :)');
});*/



module.exports = router;