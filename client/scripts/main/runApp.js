var appRouter = require('./router');
var NavBar =  require('./navBar');
var app = require('./app');

var start = function () {
    app.addRegions({
        mainRegion: '#pageContent',
        navRegion: '#navRegion'
    });
    app.addInitializer(function () {
        new appRouter();
        Backbone.history.start();
        showNavBar();
    });
    app.start();
};

/** @access private */ 
function showNavBar() {
    var navBar = new NavBar();
    app.navRegion.show(navBar);
}

module.exports = {
    start: start
};
