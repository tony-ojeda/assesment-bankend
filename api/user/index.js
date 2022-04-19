const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.status(200).json('get success');
})
router.post('/', (req, res) => {
    res.status(200).json('post success');
})
router.put('/', (req, res) => {
    res.status(200).json('put success');
})
router.delete('/', (req, res) => {
    res.status(200).json('delete success');
})


module.exports = router;