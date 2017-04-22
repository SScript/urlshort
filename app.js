   
    var express = require('express')
    var app = express();
    var mongoose = require('mongoose')
    var path = require('path')
    var port = Number(process.env.PORT || 3000)


    app.get('/', function(req, res) {                       ////////   Startup page, index.html
        res.sendFile(path.join(__dirname + '/index.html')); // link to index.html page
    })

    // var mongourl = 'mongodb://urluser:url505895@ds123930.mlab.com:23930/urlshort'   // connect to mongoLab db
    // db = mongoose.connect(mongourl || 'mongodb://localhost/urlshort')


    var Url = new mongoose.Schema({        // url schema consists of two fields
        full: String,
        short: Number
    })

    var urlModel = mongoose.model('Url', Url)
    var url = new urlModel()
/*
    var ObjectID = require('mongodb').ObjectID;        /// way to generate unique objectID, just for records
     url.id = new ObjectID();
*/
         mongoose.Promise = global.Promise
    db = mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/urlshort', function(err) {
      if (err) {
        console.log(err);
      } else { 
        console.log('Connection to MongoDB successfully established!')
      }
    })


    app.get('/:shorturl', function(req, res) {         /////////// localhost/23424       route for shortened url links

        urlModel.findOne({short: req.params.shorturl}, function(err, shorturls) {       // find if short url exists in db
            if(shorturls != null) {
                if(/^http/.test(shorturls.full))                                        // if it starts with http - just redirect
                    res.redirect(shorturls.full)
                else
                    res.redirect('http://' + shorturls.full)                            // if not - add http in front
            } else {
                res.send('Invalid entry!')
            }
        })
    })




app.get('/new/:url(*)', function(req, res) {
        
var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
/////////// Huge URL Validator, not perfect, but good enough to avoid trash links
if (regex.test(req.params.url)) {

    urlModel.findOne({full: req.params.url}, function(err, urls) {    /// Find if full url exists in DB
      if (urls == null) {                                            /// if null/doesnt exist - create new record with unique objectId
          url.full = req.params.url;
          url.short = Number(Math.random(0,100)*100000).toFixed(0);

      urlModel.create({full: url.full, short: url.short}, function(err, short) {
        if (err) throw err;

        res.json({"Full URL" : url.full, "Short URL": 'http://' + req.get('host') + '/' + url.short})
      })
      
      } else {
         res.json({"Full URL" : urls.full, "Short URL": 'http://' + req.get('host') + '/' + urls.short})
      }
    })

} else {
    res.json({Error: 'Not a valid URL!'})
}

})

app.listen(port)

