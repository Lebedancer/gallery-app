module.exports.setup = function (app, handlers) {
    app.get('/search', handlers.search);
    app.get('/gallery', handlers.get);
    app.post('/gallery',  handlers.add);
    app.post('/gallery/unselect/:id',  handlers.remove);
    app.post('/gallery/reshape',  handlers.reshape);
    app.delete('/gallery/:id',  handlers.remove);
};