'use strict';

var app = require('../../main/app');
var childModel = require('./galleryRowModel');

var reShapeUrl = '/gallery/reshape';

module.exports = Backbone.Collection.extend({
    url: '/gallery',
    model: childModel,
    initialize: initialize,
    fetch: fetch,
    reShape: reShape
});

/** @access public */
function initialize() {
    bindEvents.call(this);
}

/** @access public */
function fetch() {
    this.trigger('fetch:start');

    return Backbone.Collection.prototype.fetch.apply(this, arguments)
        .always(function() {
            this.trigger('fetch:end');
        }.bind(this))
}

/** @access public */
function reShape(array) {
    var data = JSON.stringify({
        patternArr: $.makeArray(array)
    });
    return $.ajax({
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        url: reShapeUrl,
        dataType: 'json',
        data: data
    });
}

/** @access private */
function bindEvents() {
    this.listenTo(app, 'gallery:search', searchPhotos);
    this.listenTo(app, 'gallery:reset', resetCollection);
}

/** @access private */
function searchPhotos(query) {
    this.fetch({
        url: '/search',
        data: {q: query}
    });
}

/** @access private */
function resetCollection() {
    this.reset();
}

