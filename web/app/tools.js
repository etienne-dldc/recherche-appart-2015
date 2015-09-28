"use strict";

module.exports = {
	hideAnimation: function (callback) {
		var $anims = $('.anim');
		var step = 600 / $anims.length;
		$anims.each(function(index, el) {
          $(el).css({
            transform: 'translateY(-' + (600 - (index * step)) + 'px)',
            opacity: 0
          });
        });
        if (callback == undefined) { return true; };
        _.delay(function () {
        	callback();
        }, 600);
	},
	showAndScroll: function (selector) {
		var timer = 400;
		$(selector).css('display', 'block');
		$(selector).each(function(index, el) {
			_.delay(function(){ $(el).css('transform', 'translate(0)').css('opacity', '1'); }, timer);
			timer += 100;
		});

		var App = require('application');
		if ( !App.router.visited() ) {
			_.delay(function(){ $('html, body').animate( { scrollTop: $(document).height() - $(window).height() }, 500 ); }, 500);
		}
	},
	scrollTo: function (selector) {
		var App = require('application');
		if (App.router.visited()) { return true; }

		var $elem = $(selector).first();
		var height = $elem.height();
		var diff = 0;
		if (height < $(window).height() ) {
			var diff = ($(window).height() - height)/2;
		}
		$('html, body').animate( { scrollTop: $(selector).first().offset().top - diff }, 500 );
	},
	displayNextButton: function (callback) {
		var App = require('application');
		if (App.router.visited()) {
			callback();
			return true;
		}

		function onNextClick () {
			html.off('click', onNextClick);
			html.addClass('hidden');
			callback();
		}
		var html = $('.next-button');
		if (html.length == 0) {
			var html = $(require('templates/next-button')() );
			$('body').append(html);
		};
		_.delay(function () { html.removeClass('hidden'); }, 500)
    	html.on('click', onNextClick);
	}


}