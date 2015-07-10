var app = require('./app');

var HomeView = require('./../content/homeLayout');
var GalleryView = require('./../content/gallery/galleryView');

module.exports = {
    homeRoute: homeRoute,
    galleryRoute: galleryRoute
};

/** @access public */
function homeRoute() {
    var childView = getHomeView();
    app.mainRegion.show(childView);
}

/** @access public */
function galleryRoute() {
    var options = {pure: true};
    var childView = getGalleryView(options);
    app.mainRegion.show(childView);
}

/** @access private */
function getHomeView() {
    return new HomeView();
}

/** @access private */
function getGalleryView(options) {
    return new GalleryView(options);
}