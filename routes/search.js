var express = require('express');
const {search} = require("../functions");
var router = express.Router();

router.get('/', function(req, res, next) {
    const {field, value, op} = req.body

    console.log(field, value, op)

    search(field, op, value).then(ss => {
        const docs = []
        ss.docs.forEach(doc => {
            docs.push(doc.data())
        })
        res.send(docs)
    })
});

module.exports = router;
