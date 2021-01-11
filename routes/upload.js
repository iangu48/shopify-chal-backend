var express = require('express');
const {upload} = require("../functions");
var router = express.Router();

router.post('/', function(req, res, next) {
    const urls = req.body['urls']
    console.log(urls)
    if (urls) {

        const promises = []
        urls.forEach(url => {
            promises.push(upload(url))
        })
        Promise.all(promises).then( value => {
            res.send('success');
        }).catch(r => {
            console.log(r)
            res.send({error: JSON.stringify(r)})
        })



    } else {
        res.send('missing urls: []')
    }

});

module.exports = router;
