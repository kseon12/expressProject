var users =require('./users');
var login = require('./login');
var log = require('middleware/interceptors/logger')(module);

/* List of base routes with appropriate routers */
module.exports = function (app){
  //app.use('/users', users);
    //app.get('/', require('./frontpage').get);

    app.get('/login', login.get);
    app.post('/login', login.post);

    //app.post('/logout', require('./logout').post);

};
