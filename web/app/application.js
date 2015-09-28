"use strict";

var tools = require('tools');

var App = {
  body: $('#content'),

  init: function init() {
    App.vars = {
      width: $(window).width(),
      height: $(window).height()
    };
    // Set font size
    var minFontSize = 10;
    var maxFontSize = 35;
    var fontSize = App.vars.width/35;
    fontSize = fontSize < minFontSize ? minFontSize : fontSize;
    fontSize = fontSize > maxFontSize ? maxFontSize : fontSize;
    $('body, html').css('font-size', fontSize + "px");
  },

  displayPlayButton: function () {

    $('body, html').addClass('white-back');

    var template = require('templates/play')();
    App.body.html(template);

    var svg = d3.select("#play-button")
      .attr('width', App.vars.width + 'px')
      .attr('height', App.vars.height + 'px')
    
    var rotateGroup = svg
      .append('g')
      .attr('transform', 'translate(50,50)')
    
    var path = rotateGroup.append('path')
      .attr('fill', '#e74c3c')
      .attr('width', '100')
      .attr('transform', 'translate(-26,-32)')
      .attr("d", "M16 48 C16 32 16 32 16 16 C32 24 32 24 48 32 C32 40 32 40 16 48 Z");

    path.on("mouseover", function() {
      path
        .transition()
        .ease('cubic')
        .attr("d", "M16 48 C10 42 10 22 16 16 C22 10 48 22 48 32 C48 42 22 54 16 48 Z")
    });

    path.on("mouseleave", function () {
      path
        .transition()
        .ease('cubic')
        .attr("d", "M16 48 C16 32 16 32 16 16 C32 24 32 24 48 32 C32 40 32 40 16 48 Z")
    });

    path.on("click", function () {
      path
        .transition()
        .ease('linear')
        .attr("d", "M16 48 C8 40 8 24 16 16 C24 8 48 12 48 32 C48 52 24 56 16 48 Z")

      rotateGroup
        .transition()
        .ease('cubic')
        .duration(500)
        .attr('transform', 'translate(50,50) scale(10)')

      _.delay(function () {
        App.router('/welcom');
      }, 500);

    });
  },

  welcom: function () {

    App.body.html('');
    var template = require('templates/welcom')();
    App.body.html(template);

    function afterWrite() {
      $('.typed-cursor').remove();
      tools.showAndScroll('.answer');
    };

    $(".hello").append('<span></span>');
    if ( App.router.visited() ) {
        $(".hello span").css({opacity: '0'})
        .html("Salut,<br/> je m'appelle Etienne, j'ai 20 ans<br/> et je cherche une colocation à <b>Paris</b>.")
        .animate({opacity: 1}, 200);
        afterWrite();
    } else {
      $(".hello span").typed({
        strings: ["Salut,<br/> ^500 je m'appelle Etienne, ^500j'ai 20 ans<br/> ^500et je cherche une colocation à <b>Paris</b>."],
        typeSpeed: 0.1,
        callback: afterWrite,
      });
    }
  },

  maRecherche: function () {
    
    App.body.html('');
    var template = require('templates/ma-recherche')();
    App.body.html(template);

    function afterWrite() {
      $('.typed-cursor').remove();
      tools.showAndScroll('.answer');
    };

    $(".question").append('<span></span>');
    if ( App.router.visited() ) {
        $(".question span").css({opacity: '0'})
          .html("Que veux-tu savoir ?")
          .animate({opacity: 1}, 200);
        afterWrite();
    } else {
      $(".question span").typed({
        strings: ["Que veux-tu savoir ?"],
        typeSpeed: 0.1,
        callback: afterWrite,
      });
    }
  },

  chercheAppart: function () {
    
    App.body.html('');
    var template = require('templates/cherche-appart')();
    App.body.html(template);

    function afterWrite() {
      $('.typed-cursor').remove();
      tools.showAndScroll('.answer');
    };

    $(".question").append('<span></span>');
    if ( App.router.visited() ) {
        $(".question span").css({opacity: '0'})
          .html("Bienvenue au club... <br/> On pourrai s'entraider tu ne pense pas ?")
          .animate({opacity: 1}, 200);
        afterWrite();
    } else {
      $(".question span").typed({
        strings: ["Bienvenue au club... <br/> ^500 On pourrai s'entraider tu ne pense pas ?"],
        typeSpeed: 0.1,
        callback: afterWrite,
      });
    }
  },

  partage: function () {

    App.body.html('');
    var template = require('templates/partage')();
    App.body.html(template);

    function afterWrite() {
      $('.typed-cursor').remove();

      _.delay(function(){ $('.partage-tw').css('transform', 'translateY(0)').css('opacity', '1'); }, 400);
      _.delay(function(){ $('.partage-fb').css('transform', 'translateY(0)').css('opacity', '1'); }, 500);
      $('.partage').click(function(event) {
        $(".merci").append('<span></span>');
        $(".merci span").typed({
          strings: ["Merci :)"],
          typeSpeed: 0,
          callback: function () {
            $('.typed-cursor').remove();
          }
        });
      });
    };

    $(".help-me").append('<span></span>');
    if ( App.router.visited() ) {
        $(".help-me span").css({opacity: '0'})
          .html("Pour m'aider, rien de plus simple<br/> il suffit de partager ce site avec tes amis, <br/> je t'en serai grandement reconnaissant !")
          .animate({opacity: 1}, 200);
        afterWrite();
    } else {
      $(".help-me span").typed({
        strings: ["Pour m'aider, rien de plus simple<br/> ^500il suffit de partager ce site avec tes amis, <br/> je t'en serai grandement reconnaissant !"],
        typeSpeed: 0,
        callback: afterWrite,
      });
    }
  },

  contact: function () {

    App.body.html('');
    var template = require('templates/contact')();
    App.body.html(template);

    tools.showAndScroll('.form-elem');

    $('form').submit(function(event) {
      event.preventDefault();

      var data = $(this).serializeArray();
      var dataObj = {};
      _.each(data, function(element, index, list){ dataObj[element.name] = element.value; });
      console.log("dataObj:", dataObj);
      var settings = {
        async: true,
        crossDomain: true,
        url: "http://localhost:8080/send-mail",
        method: "POST",
        data: dataObj
      }

      $.ajax(settings).done(function (response) {
        console.log("response:", response);

        if (response.success) {
          $('form').animate({
            opacity: 0,
            marginTop: '-10em'},
            500, function() {
              $('form').css('display', 'none');
              var successElem = $('<p class="success"><span></span></p>');
              $('.contact').append(successElem);
              successElem.find('span').typed({
                strings: ["Ton message à été envoyé :) <br /> ^500 Je te répond bientot, promis."],
                typeSpeed: 0,
                callback: function () {
                  $('.typed-cursor').remove();
                }
              });
          });
        } else {
          if (response.notValid) {
            $('.error.nom').css("height", "0em");
            $('.error.mail').css("height", "0em");
            $('.error.message').css("height", "0em");
            for (var i = response.errors.length - 1; i >= 0; i--) {
              var error = response.errors[i];
              console.log("error:", error);

              if (error[0] == "nom") {
                $('.error.nom p').html(error[1]);
                $('.error.nom').css("height", "2em");
              }

              if (error[0] == "mail") {
                $('.error.mail p').html(error[1]);
                $('.error.mail').css("height", "2em");
              }

              if (error[0] == "message") {
                $('.error.message p').html(error[1]);
                $('.error.message').css("height", "2em");
              }
            };
          } else {
            var oopsElem = $('<p class="oops"><span></span></p>');
            $('.contact').append(oopsElem);
            oopsElem.find('span').typed({
              strings: ["Oops, une erreu s'est produit :/"],
              typeSpeed: 0,
              callback: function () {
                $('.typed-cursor').remove();
                _.delay(function () {
                  oopsElem.slideUp();
                }, 3000);
              }
            });
          }
        }
      });
    });

  },

  aboutMe: function () {
    
    App.body.html('');
    var template = require('templates/about-me')();
    App.body.html(template);

    function afterWrite() {
      $('.typed-cursor').remove();
      tools.showAndScroll('.answer');
    };

    $(".write").append('<span></span>');
    if ( App.router.visited() ) {
        $(".write span").css({opacity: '0'})
          .html("Je viens d'optenir un DUT MMI (Métiers du Multimédia et de l'Internet) à Limoges " +
            "<br />  et je serai cette année à l'<b>Ecole des Gobelins</b> à Paris " +
            "<br /> pour faire un <b>Bachelor Developer et Designer Intéractif</b>." +
            "<br /> <br /> Je serai ravi de t'en dire plus sur moi mais bon... <br /> Je ne prefere pas trop étaler ma vie sur internet. "
          )
          .animate({opacity: 1}, 200);
        afterWrite();
    } else {
      $(".write span").typed({
        strings: ["Je viens d'optenir un DUT MMI (Métiers du Multimédia et de l'Internet) à Limoges " +
            "<br /> ^400  et je serai cette année à l'<b>Ecole des Gobelins</b> à Paris " +
            "<br /> pour faire un <b>Bachelor Developer et Designer Intéractif</b>." +
            "<br /> <br /> ^600 Je serai ravi de t'en dire plus sur moi mais bon... ^600 <br /> Je ne prefere pas trop étaler ma vie sur internet. "
          ],
        typeSpeed: 0.1,
        callback: afterWrite,
      });
    }

  },

  where: require('where'),

  budget: function () {
    
    App.body.html('');
    var template = require('templates/budget')();
    App.body.html(template);

    function afterWrite () {
      $('.typed-cursor').remove();

      var $elem = $('.budget-val');
      $elem.prop('Counter',0).animate({
        Counter: 650
      }, {
        duration: 3000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now) + " €");
        }
      });
    }

    $(".write").append('<span></span>');
    if ( App.router.visited() ) {
        $(".write span").css({opacity: '0'})
          .html("Mon budget est de... <br /> " +
            " roulement de tambour... <br />" +
            " ... <br /> " + 
            ' <span class="budget-val">0</span>'
          )
          .animate({opacity: 1}, 200);
        afterWrite();
    } else {
      $(".write span").typed({
        strings: ["Mon budget est de... <br /> " +
            " ^1000 roulement de tambour... <br />" +
            " ^1000 .^400.^400. <br /> " + 
            ' ^1000 <span class="budget-val">0</span>'
          ],
        typeSpeed: 0.1,
        callback: afterWrite,
      });
    }

  },

  colocation: function () {
    
    App.body.html('');
    var template = require('templates/colocation')();
    App.body.html(template);

  },

  exit: require('app-exit'),

  notFound: function () {
    App.body.html('');
    var template = require('templates/not-found')();
    App.body.html(template);
  }

};

var throttled = _.throttle(App.init, 100);
$(window).resize(throttled);

App.init();

module.exports = App;


