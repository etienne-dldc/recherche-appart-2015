'use strict';

var page = require('page');
var App = require('application');
var displayHeader = require('display-header');

var Router = function (destination) {
	if (destination == undefined) {
		return Router.init();
	} else {
		return page(destination);
	}
};

Router.visitedList = [];
Router.current = '/init';

function visit (ctx, next) {
    if ( _.contains(Router.visitedList, Router.current) == false ) {
        Router.visitedList.push(Router.current);
    }
    Router.current = ctx.pathname;
    // Save in cookie
    Cookies.set('visited', JSON.stringify(Router.visitedList) );
    next();
}

function router (ctx, next) {
    var path = ctx.pathname.slice(1);
    var camelCased = path.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    if ( _.isFunction(App[camelCased]) ) {
        App[camelCased]();
    } else {
        App.notFound();
        console.error('404 NOT FOUND :/');
    }
}

function exitRouter (ctx, next) {

    $('html, body').animate({scrollTop: 0}, 400);
    
    var path = ctx.pathname.slice(1);
    var camelCased = path.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    if ( _.isFunction(App.exit[camelCased]) ) {
        App.exit[camelCased](ctx, next);
    } else {
        App.exit.defaut(ctx, next);
    }
}

Router.init = function () {

    var cookie = Cookies.get('visited');
    if (cookie !== undefined) {
        Router.visitedList = JSON.parse(cookie);
    }

    App.router = require('router');

    // Deploy on gh-pages
    page.base('/recherche-appart-2015');

    page('/', visit, displayHeader, App.displayPlayButton);
    page('*', visit, displayHeader, router);

    page.exit('/', App.exit.home);
    page.exit('*', exitRouter);

	page();

};

Router.visited = function () {
    return _.contains(Router.visitedList, page.current);
}



module.exports = Router;

