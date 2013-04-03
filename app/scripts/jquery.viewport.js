'use strict';
/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function ($) {
  $.belowthefold = function (element, settings) {
    var fold = $(window).outerHeight(true) + $(window).scrollTop();
    return fold <= $(element).offset().top - settings.thresholdBottom;
  };

  $.abovethetop = function (element, settings) {
    var top = $(window).scrollTop();
    return top >= $(element).offset().top + $(element).outerHeight(false) - settings.thresholdTop;
  };

  $.rightofscreen = function (element, settings) {
    var fold = $(window).width() + $(window).scrollLeft();
    return fold <= $(element).offset().left - settings.thresholdRight;
  };

  $.leftofscreen = function (element, settings) {
    var left = $(window).scrollLeft();
    return left >= $(element).offset().left + $(element).width() - settings.thresholdLeft;
  };

  $.inviewport = function (element, settings) {
    return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
  };

  $.extend($.expr[':'], {
    'below-the-fold': function (a) {
      var bottom = p[3] || 0;
      return $.belowthefold(a, {thresholdBottom : bottom});
    },
    'above-the-top': function (a) {
      var top = p[3] || 0;
      return $.abovethetop(a, {thresholdTop : top});
    },
    'left-of-screen': function (a) {
      var left = p[3] || 0;
      return $.leftofscreen(a, {thresholdLeft : left});
    },
    'right-of-screen': function (a) {
      var right = p[3] || 0;
      return $.rightofscreen(a, {thresholdRight : right});
    },
    'in-viewport': function (a, i, p) {
      var m = p[3].split(',');
      var left = m[0] || 0;
      var right = m[1] || 0;
      var top = m[2] || 0;
      var bottom = m[3] || 0;
      return $.inviewport(a, {thresholdLeft : left, thresholdRight : right, thresholdTop : top, thresholdBottom : bottom});
    }
  });
})(jQuery);