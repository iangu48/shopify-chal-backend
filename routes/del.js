var express = require('express');
const {del} = require("../functions");
var router = express.Router();

router.post('/', function(req, res, next) {
    const {id} = req.body

    del(id).then(() => {
        res.send(JSON.stringify({success: "deleted"}))
    })
        .catch(r => {
            res.send(JSON.stringify(r))
        })
});

module.exports = router;
