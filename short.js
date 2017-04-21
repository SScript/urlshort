
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

    var Url = new Schema({
        full: String,
        short: Number
    })

    var urlModel = mongoose.model('Url', Url)
    
    
module.exports = urlModel

