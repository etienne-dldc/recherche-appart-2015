var headerElem = $( require('templates/header')() );
$('body').prepend( headerElem );
var $content = headerElem.find('.content');
var links = $content.find('a');
var $legend = headerElem.find('.legend');
var $legendBox = headerElem.find('.legend-box');
var $legendContent = $legend.find('.legend-content');

links.hover(function() {
	$content.addClass('shadow');
	var title = $(this).attr('title');
	var left = $(this).offset().left + ($(this).width() / 2);
	$legendContent.html(title);
	var position = 500 + left;// - ($legendContent.width() / 2);
	position = position < 10 ? 10 : position;
	//position = position + $legendContent.width() > ($(window.width) - 10) ? $(window.width) - 10 - $legendContent.width() : position;
	$legend.css('margin-left', position );
	$legendBox.removeClass('hidden');
}, function() {
	$content.removeClass('shadow');
	$legendBox.addClass('hidden');
});

// var throttled = _.throttle(function (event) {
// 	var position = event.clientX / $(window).width();
// 	$content.css({
// 		marginLeft: "-" + position*10 + "em" ,
// 		marginRight: "-" + (1-position)*10 + "em"
// 	});
// }, 1000/30);
// headerElem.mousemove(function (event) {
// 	var mouseEvent = event;
// 	throttled(mouseEvent);
// });

module.exports = function (ctx, next) {
	var path = ctx.pathname.slice(1);
	if (path.length == 0) { path = "home" };
    var camelCased = path.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

    links.removeClass('active');
    links.each(function(index, el) {
    	if (ctx.pathname == $(el).attr('href') ) {
    		$(el).addClass('active');
    	};
    });

	if ( !_.contains(['welcom', 'home'], camelCased) ) {
		headerElem.removeClass('hidden');
	} else {
		headerElem.addClass('hidden');
	}

	next();
}