'use strict';

module.exports = {
    addShapeShift: addShapeShift
};

/** @access private */
function addShapeShift(isPureView) {
    var $el = this.$el;

    $el.trigger('ss-destroy');

    $el.shapeshift({
        enableDrag: isPureView,
        animateOnInit: true,
        gutterX: 20,
        gutterY: 20
    });

    countImgLoads.call(this);
    bindEvents.call(this);
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

/** @access private */
function bindEvents() {
    var $el = this.$el;

    $el.on('ss-arranged', function() {
        $el.addClass('ifun-gall--dragged');
    });

    $el.on('ss-drop-complete', function() {
        $el.removeClass('ifun-gall--dragged');
    });

    $el.on('ss-rearranged', $.proxy(reShape, this))
}

/** @access private */
function reShape() {
    var $items = this.$el.find('.ss-active-child');
    var ids = $items.map(function(ind, obj) {
        return $(obj).data('id');
    });

    this.collection.reShape(ids);
}