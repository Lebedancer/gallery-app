'use strict';

var $body = $('body');

module.exports = Marionette.ItemView.extend({
    template: '#navBarTemplate',
    className: 'ifun-nav',
    tagName: 'aside',
    events: {
        'click .js-menu': toggleMenu,
        'click .js-goToPage': hideMenu
    },
    initialize: initialize
});

/** @access public */
function initialize() {
    bindEvents.call(this);
}

/** @access private */
function bindEvents() {
    var view = this;

    $(document).on('click', function(e) {
        var $el = $(e.target);

        if (!$el.closest(view.$el).length) {
            hideMenu();
        }
    })
}

/** @access private */
function toggleMenu() {
    $body.toggleClass('nav--open');
}

/** @access private */
function hideMenu() {
    $body.removeClass('nav--open');
}
