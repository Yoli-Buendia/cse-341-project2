const router = require('express').Router();

router.use('/', require('./swagger'));

//router.get('/', (req, res) => { res.send('Hello Brother Porter :)');});
router.get('/', (req, res) => {
    res.send('Hello Brother Porter :)');
});

router.use('/groupA', require ('./groupA'));
router.use('/groupB', require ('./groupB'));
module.exports = router;