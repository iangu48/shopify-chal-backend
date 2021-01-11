var express = require('express');
const {del} = require("../functions");
var router = express.Router();

router.post('/', function(req, res, next) {
    const {id} = req.body

    del(id).then(() => {
        res.send('success'
        )
    })
        .catch(r => {
            res.send(r)
        })
});

module.exports = router;
