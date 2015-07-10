'use strict';

var app = require('../../main/app');

module.exports = Marionette.ItemView.extend({
    className: 'ifun-gall__emptyBlock',
    template: getTemplate
});

/** @access private */
function getTemplate() {
    var message = 'Юзай поиск (^_-)';
    var isPure = app.request('gallery:isPure');

    if (isPure) {
        message = 'Оу, ничего нет (о_О)'
    } else if (isQuery()) {
        message = 'Ничего не найдено (Т_Т)'
    }

    return message;
}

/** @access private */
function isQuery() {
    var searchQuery = app.request('gallery:getSearchQuery');
    return searchQuery && searchQuery.length;
}