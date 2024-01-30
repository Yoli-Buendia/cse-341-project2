const router = require('express').Router();

//router.use('/', require('./swagger'));

router.get('/', (req, res) => { res.send('Hello Brother Porter :)');});
/*router.get('/', (req, res) => {
    res.send('Hello world');
});*/

/*router.use('/users', require ('./users'));
router.use('/collection2', require ('./collection2'));*/
module.exports = router;