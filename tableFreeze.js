"use strict";


function TableFreezeOptions() {
    this.marginTop = 50;
    this.marginLeft = 0;
    this.fixedLines = 1;
    this.fixedColumns = 0;
}

function tableFreeze(table, opts) {
    var defaultOpts = new TableFreezeOptions;
    var marginTop = (opts && opts.marginTop >= 0) ? opts.marginTop : defaultOpts.marginTop;
    var marginLeft = (opts && opts.marginLeft >= 0) ? opts.marginLeft : defaultOpts.marginLeft;
    var fixedLines = (opts && opts.fixedLines >= 0) ? opts.fixedLines : defaultOpts.fixedLines;
    var fixedColumns = (opts && opts.fixedColumns >= 0) ? opts.fixedColumns : defaultOpts.fixedColumns;

    function getTotalOffsetTop(ele) {
        if (!ele) { return 0; }
        return ele.offsetTop + getTotalOffsetTop(ele.offsetParent);
    }

    function getTotalOffsetLeft(ele) {
        if (!ele) { return 0; }
        return ele.offsetLeft + getTotalOffsetLeft(ele.offsetParent);
    }

    function refresh() {
        var $trs = $(table).find('tr');
        var $hdr = $trs.slice(0, 0 + fixedLines);

        var scrollTop = $(window).scrollTop();
        var scrollLeft = $(window).scrollLeft();
        var offsetTop = getTotalOffsetTop(table) - marginTop - scrollTop;
        var offsetLeft = getTotalOffsetLeft(table) - marginLeft - scrollLeft;

        if (offsetTop < 0) {
            var top = - offsetTop;
            $hdr.css('position', 'relative')
                .css('top', top + "px")
                .css('z-index', 1);
        } else {
            $hdr.css('top', 0);
        }

        if (offsetLeft < 0) {
            var left = - offsetLeft;
            $trs.each(function () {
                $(this).find('td,th').slice(0, fixedColumns)
                    .css('position', 'relative')
                    .css('left', left + "px");
            });
        } else {
            $trs.each(function () {
                $(this).find('td,th').slice(0, fixedColumns).css('left', 0);
            });
        }
    }

    $(window).on('scroll', refresh);
    $(window).on('resize', refresh);
    $(table).on('table-rendered', refresh);
}

$(function () {
    $('.table-freeze').each(function () {
        var $tb = $(this);
        var opts = new TableFreezeOptions();
        opts.fixedLines = + $tb.data('freeze-lines');
        opts.fixedColumns = + $tb.data('freeze-columns');
        tableFreeze(this, opts);
    });
});