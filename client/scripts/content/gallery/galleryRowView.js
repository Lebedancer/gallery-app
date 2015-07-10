'use strict';

module.exports = Marionette.ItemView.extend({
    template: '#galleryViewRowTemplate',
    className: 'ifun-gall__item',
    ui: {
        actionButton: '.js-actionButton'
    },
    events: {
        'click @ui.actionButton': makeAction
    },
    onRender: onRender
});

/** @access public */
function onRender() {
    setImg.call(this);

}

/** @access private */
function setImg() {
    var $el = this.$('.js-gallItem-img');
    $el.attr('src', this.model.get('src'));
}

/** @access private */
function makeAction() {
    var view = this;
    var $view = this.$el;
    var choosen = $view.attr('data-choosen');
    var model = this.model;

    $view.attr('disabled', 'disabled');

    if (choosen) {
        $view.removeAttr('data-choosen');
        model.unSelect()
            .done(function() {
                onSuccessAction.call(view);
            })
            .fail(function () {
                onFailAction.call(view);
            })
    } else {
        $view.attr('data-choosen', true);
        model.save()
            .done(function() {
                onSuccessAction.call(view);
            })
            .fail(function () {
                onFailAction.call(view);
            })
    }
}

/** @access private */
function onSuccessAction() {
    this.$el.removeAttr('disabled', 'disabled')
        .toggleClass('ifun-gall__item--choosen');

    this.ui.actionButton.toggleClass('ifun-icon--daw ifun-icon--x');
}

/** @access private */
function onFailAction() {
    this.$el.removeAttr('disabled', 'disabled');
}