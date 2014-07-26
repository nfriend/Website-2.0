$(init);

function init() {
    'use strict';

    //show outdated broser warning if IE7 or below
    if (window.isLessThanIE8) {
        $("#IE7warning").css("display", "inline");
    }

    //if svg is not supported, replace all img tags with non-svg source
    if (window.isLessThanIE9) {
        $("img").each(function () {
            $(this).attr("src", $(this).attr("fallbacksrc"));
        });
    }

    //if transitions are supported, begin all links with an initial color
    //and fade out after .5 seconds
    setTimeout(function () {
        $(".initial-flash").removeClass("initial-flash");
    }, window.isLessThanIE10 ? 0 : 500);
}