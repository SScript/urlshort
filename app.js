   
    var express = require('express')
    var app = express();
    var mongoose = require('mongoose')
    var path = require('path')
    var port = Number(process.env.PORT || 3000)



    app.get('/', function(req, res) {                       ////////   Startup page, index.html
        res.sendFile(path.join(__dirname + '/index.html'));
    })
    var mongourl = 'mongodb://urluser:url505895@ds123930.mlab.com:23930/urlshort'

    db = mongoose.connect(mongourl || 'mongodb://localhost/urlshort')

    var Url = new mongoose.Schema({
        full: String,
        short: Number
    })

    var urlModel = mongoose.model('Url', Url)
    var url = new urlModel()

    app.get('/:shorturl', function(req, res) {
        
        urlModel.findOne({short: req.params.shorturl}, function(err, shorturls) {
            if(shorturls != null) {
                if(/^http/.test(shorturls.full))
                    res.redirect(shorturls.full)
                else
                    res.redirect('http://' + shorturls.full)
            } else {
                res.send('Invalid entry!')
            }
        })

    })



app.get('/new/:url(*)', function(req, res) {
        
var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/

if(regex.test(req.params.url)) {
        urlModel.findOne({full: req.params.url}, function(err, urls) {
            if(urls == null) {
console.log(urls)
                url.id = new mongoose.Types.ObjectId();
                url.full = req.params.url;
                url.short = Number(Math.random(0,100)*100000).toFixed(0);

url.save(function(err){

                    res.json({"Full URL" : url.full, "Short URL": 'http://' + req.get('host') + '/' + url.short})
// db.disconnect();
                })
            } else {
                    res.json({"Full URL" : urls.full, "Short URL": 'http://' + req.get('host') + '/' + urls.short})
            }
// db.disconnect();
            // If the Node process ends, close the Mongoose connection



        })
} else {
    res.send('Not a valid URL!')
}
})

app.listen(port)

