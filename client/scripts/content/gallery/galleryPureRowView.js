'use strict';

module.exports = Marionette.ItemView.extend({
    template: '#galleryViewPureRowTemplate',
    className: 'ifun-gall__item',
    events: {
        'click .js-actionButton': remove
    },
    onRender: onRender
});

/** @access public */
function onRender() {
    setImg.call(this);
    this.$el.attr('data-id', this.model.get('id'));
}

/** @access private */
function setImg() {
    var $el = this.$('.js-gallItem-img');
    $el.attr('src', this.model.get('src'));
}

/** @access private */
function remove() {
    var $el = this.$el;

    $el.attr('disabled', 'disabled');

    this.model.destroy()
        .fail(function () {
            $el.removeAttr('disabled');
        })
}

