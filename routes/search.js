var express = require('express');
const {search} = require("../functions");
var router = express.Router();

router.post('/', function(req, res, next) {
    const {field, value, op} = req.body

    console.log(field, value, op)

    search(field, op, value).then(ss => {
        const docs = []
        ss.docs.forEach(doc => {
            docs.push({...doc.data(), id: doc.id})
        })
        res.send(docs)
    })
        .catch(r => {
            res.send(JSON.stringify(r))
        })
});

module.exports = router;
