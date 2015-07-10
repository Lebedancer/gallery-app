module.exports.setup = function (app) {
    app.get('/', function(req, res, next) {
        res.render('index');
    });
};