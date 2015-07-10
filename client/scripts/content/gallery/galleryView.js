'use strict';

require('../../vendors/jquery-ui');
require('../../vendors/jquery.shapeshift');

var GalleryRowView = require('./galleryRowView');
var GalleryPureRowView = require('./galleryPureRowView');
var GalleryEmptyRowView = require('./galleryEmptyRowView');
var GalleryCollection = require('./galleryCollection');
var ShapeMixin = require('./mixins/viewShapeMixin');
var app = require('../../main/app');

var isPure;

module.exports = Marionette.CollectionView.extend({
    template: '#galleryViewTemplate',
    className: 'ifun-gall',
    getChildView: getChildView,
    emptyView: GalleryEmptyRowView,
    onRender: onRender,
    initialize: initialize
});

/** @access public */
function initialize() {
    $.extend(this, ShapeMixin);

    this.collection = new GalleryCollection();
    isPure = isPureView.call(this);

    bindEvents.call(this);
    initRequests.call(this);
}

/** @access public */
function onRender() {
    if (isPure) {
        this.collection.fetch();
    }
}

/** @access private */
function bindEvents() {
    this.listenTo(this.collection, 'fetch:end', onCollectionFetch);
}

/** @access private */
function initRequests() {
    app.reqres.setHandler('gallery:isPure', $.proxy(isPureView, this));
}

/** @access private */
function onCollectionFetch() {
    var isItems = this.collection.length;

    if (!isItems && !isPure) {
        this.render();
    }

    this.addShapeShift(isPureView.call(this));
}

/** @access private */
function isPureView() {
    return !!this.options.pure;
}

/** @access private */
function getChildView() {
    var childView = GalleryRowView;

    if (isPureView.call(this)) {
        childView = GalleryPureRowView
    }

    return childView;
}

/** @access private */
function addShapeShift() {
    var $el = this.$el;

    $el.shapeshift({
        enableDrag: isPureView.call(this),
        animateOnInit: true,
        gutterX: 20,
        gutterY: 20
    });

    countImgLoads.call(this);

    $el.on('ss-arranged', function() {
        $el.addClass('ifun-gall--dragged');
    });
    $el.on('ss-drop-complete', function() {
        $el.removeClass('ifun-gall--dragged');
    })
}

/** @access private */
function countImgLoads() {
    var count = 0;
    var childrenCount = this.children.length;
    var $el = this.$el;

    this.$('.js-gallItem-img').load(function() {
        count++;
        if (count === childrenCount) {
            $el.trigger('ss-rearrange');
            $el.removeClass('ifun-gall--dragged');
        }
    });

}