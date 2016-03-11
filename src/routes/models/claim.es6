var mongoConnect = require('../../../admin/mongoConnect.js');
var mongoose = mongoConnect;
var Schema = mongoose.Schema;
var Support = require('./support');

var ClaimSchema   = new Schema({
	slug: {type: String, required: true},
    title: {type: String, required: true},
    banner: {type: String},
    claimSupport: []
});

module.exports = mongoose.model('Claim', ClaimSchema);