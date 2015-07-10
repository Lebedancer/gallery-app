'use strict';

var app = require('../main/app');
var GalleryView = require('./gallery/galleryView');

module.exports = Marionette.LayoutView.extend({
    template: '#companyPageLayoutTemplate',
    regions: {
        galleryRegion: '#galleryRegion'

    },
    events: {
        'click .js-searchPhoto': searchPhotos,
        'keyup .js-searchInput': onPressKey
    },
    onRender: onRender
});

/** @access public */
function onRender() {
    initRequests.call(this);
    showChildView.call(this);
}

/** @access private */
function showChildView() {
    var childView = new GalleryView();
    this.galleryRegion.show(childView);
}

/** @access private */
function searchPhotos() {
    var query = getQuery.call(this);

    if(query.length){
        app.trigger('gallery:search', query);
    } else {
        app.trigger('gallery:reset');
    }
}

/** @access private */
function onPressKey(e) {
    var isEnter = e.keyCode === 13;

    if(isEnter){
        searchPhotos.call(this);
    }
}

/** @access private */
function getQuery() {
    return this.$('.js-searchInput').val();
}

/** @access private */
function initRequests() {
    app.reqres.setHandler('gallery:getSearchQuery', $.proxy(getQuery, this));
}