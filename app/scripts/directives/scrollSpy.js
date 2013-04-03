'use strict';

angular.module('ismikey.comApp')
  .directive('scrollSpy', ['$rootScope', '$location', function ($rootScope, $location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var jqEle = $(element);

        var navigation = jqEle.find('.navigation');

        // for each header, setup sticky
        var who = jqEle.find('#who');
        var whoNav = jqEle.find('.nav-who');
        var whoOrigY = who.offset().top - parseInt(who.css('margin-top'), 10);

        var where = jqEle.find('#where');
        var whereNav = jqEle.find('.nav-where');
        var whereOrigY = where.offset().top - parseInt(where.css('margin-top'), 10);

        var what = jqEle.find('#what');
        var whatNav = jqEle.find('.nav-what');
        var whatOrigY = what.offset().top - parseInt(what.css('margin-top'), 10);


        var isLabel = jqEle.find('.label-is');
        var doLabel = jqEle.find('.label-do');
        var doesLabel = jqEle.find('.label-does');

        var bottomPadding = jqEle.find('.bottom-padding');

        scope.resize = function () {

          var height = $(window).outerHeight();
          // if viewport height is less than where height, need to add padding
          if (where.outerHeight(true) + navigation.outerHeight(true) < height + 5) {
            bottomPadding.height(height + 5 - where.outerHeight(true) - navigation.outerHeight(true));
          }
        };

        scope.smoothScroll = function () {
          if ($location.path() === '/') {
            var position = 0;
            if ($location.hash() !== '') {
              var anchor = $('a[name=\'' + $location.hash() + '\']');
              position = anchor.offset().top - navigation.outerHeight(true) + 5;
            }
            else {
              position = 0;
            }
            // assuming relative position to ofset the nav
            $('html, body').animate(
            {
              scrollTop : position
            }, 500);
          }
        };

        scope.updateScroll = function () {
          var inview = $('.section:in-viewport(0,0,42,0)').attr('id');
          switch (inview) {
          case 'who':
            isLabel.removeClass('inactive');
            doLabel.addClass('inactive');
            doesLabel.addClass('inactive');

            whereNav.addClass('inactive');
            whereNav.removeClass('active');
            whoNav.removeClass('inactive');
            whoNav.addClass('active');
            whatNav.removeClass('active');
            whatNav.addClass('inactive');
            break;
          case 'what':
            isLabel.addClass('inactive');
            doLabel.removeClass('inactive');
            doesLabel.removeClass('inactive');

            whereNav.addClass('inactive');
            whereNav.removeClass('active');
            whoNav.removeClass('active');
            whoNav.addClass('inactive');
            whatNav.removeClass('inactive');
            whatNav.addClass('active');
            break;
          case 'where':
            isLabel.removeClass('inactive');
            doLabel.addClass('inactive');
            doesLabel.addClass('inactive');

            whereNav.addClass('active');
            whereNav.removeClass('inactive');
            whoNav.removeClass('active');
            whoNav.addClass('inactive');
            whatNav.removeClass('active');
            whatNav.addClass('inactive');
            break;
          }
          // find where we are on page and remove and apply sticky
          if (window.scrollY > 0) {
            who.addClass('movedown');
            navigation.addClass('navbar-fixed-top');
          }
          else {
            navigation.removeClass('navbar-fixed-top');
            who.removeClass('movedown');
          }
        };

        // on location change, smooth scroll
        $rootScope.$on('$routeChangeSuccess', function () {
          scope.smoothScroll();
        });
        $rootScope.$on('$routeUpdate', function () {
          scope.smoothScroll();
        });

        // setup listener
        $(window).scroll(scope.updateScroll);
        $(window).resize(scope.resize);

        // init
        scope.updateScroll();
        $('#where img').load(scope.resize);
        window.prettyPrint();
        scope.smoothScroll();
      }
    };
  }]);
