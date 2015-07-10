'use strict';

var unselectUrl = '/gallery/unselect';
var $ = require('jquery');

module.exports = Backbone.Model.extend({
    urlRoot: '/gallery',
    unSelect: unSelect
});

/** @access public */
function unSelect() {
    return $.post(unselectUrl + '/' + this.get('id'));
}