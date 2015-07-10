var api = require('./api');
var pages = require('./pages');
var handlers = require('../handlers')();

module.exports.setup = function (app) {
    api.setup(app, handlers);
    pages.setup(app);

    app.get('*', function(req, res){
        res.status(404);
        res.render('error', {
            message: 'Нет ниче (+_+)',
            status: 404
        });
    });

    app.use(function (req, res, next) {
        res.status(500);
        res.render('error', {
            message: 'Ошибка приложулечки (>_<)',
            status: 500
        });
    });

};

