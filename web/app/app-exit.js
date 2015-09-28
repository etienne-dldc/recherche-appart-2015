var tools = require('tools');


var Exit = {

    defaut: function (ctx, next) {
        var App = require('application');
        App.body.animate(
          {
              marginLeft: "10em",
              marginRight: "-10em",
              opacity: 0
          },
          500,
          function() {
              _.delay(function () {
                  App.body.css({
                      marginLeft: "0",
                      marginRight: "0",
                      opacity: 1
                  })
                  next();
              }, 100);
          }
        );
    },

    home: function (ctx, next) {
        $('body, html').removeClass('white-back');
        _.delay(next , 300);
    },

    welcom: function (ctx, next) {
        tools.hideAnimation(next);
    },

    maRecherche: function (ctx, next) {
        tools.hideAnimation(next);
    },

    chercheAppart: function (ctx, next) {
        tools.hideAnimation(next);
    },

    aboutMe: function (ctx, next) {
        tools.hideAnimation(next);
    },

    where: function (ctx, next) {
        tools.hideAnimation(next);
    }

}

module.exports = Exit;