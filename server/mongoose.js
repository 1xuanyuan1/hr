var mongoose = require('mongoose')
mongoose.connect('mongodb://115.159.76.152/hr?authSource=admin', {
  user: 'Duke',
  pass: 'Duke@123'
})
mongoose.Promise = global.Promise
module.exports = mongoose
