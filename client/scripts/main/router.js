var appController = require('./controller');

module.exports = Marionette.AppRouter.extend({
    controller: appController,
    appRoutes: {
        '': 'homeRoute',
        'gallery': 'galleryRoute'
    }
});
