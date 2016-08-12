var mongoose = require('../node_modules/mongoose');
var expressSession = require('../node_modules/express-session');
var MongoStore = require('../node_modules/connect-mongo')(expressSession);

var logger = require('../middleware/interceptors/logger')(module);
logger.info("Session store pass");

var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;