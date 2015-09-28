
module.exports = function () {
  var App = require('application');
  var tools = require('tools'); 
    
  App.body.html('');
  var template = require('templates/where')();
  App.body.html(template);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.8506834, lng: 2.3647038},
    zoom: 13,
    scaleControl: true,
    scrollwheel: false,
    styles: require('map-style')
  });

  // Info
  var infowindowRea = new google.maps.InfoWindow({
    content: ''+
    '<div class="content info-content">'+
      '<div class="siteNotice">'+
      '</div>'+
      '<h1 class="firstHeading" class="firstHeading">Realytics</h1>'+
      '<div class="bodyContent">'+
        '<p>Entreprise Realytics</p>'+
      '</div>'+
    '</div>'
  });
  var markerRea = new google.maps.Marker({
    position: {lat: 48.87223, lng: 2.3571991},
    map: map,
    title: 'Realytics'
  });
  markerRea.addListener('click', function() {
    infowindowGob.close();
    infowindowSearch.close();
    infowindowRea.open(map, markerRea);
  });

  var infowindowGob = new google.maps.InfoWindow({
    content: ''+
    '<div class="content info-content">'+
      '<div class="siteNotice">'+
      '</div>'+
      '<h1 class="firstHeading" class="firstHeading">Gobelins</h1>'+
      '<div class="bodyContent">'+
        '<p>Ecole des Gobelins</p>'+
      '</div>'+
    '</div>'
  });
  var markerGob = new google.maps.Marker({
    position: {lat: 48.8372215, lng: 2.3536464},
    map: map,
    title: 'Realytics'
  });
  markerGob.addListener('click', function() {
    infowindowRea.close();
    infowindowSearch.close();
    infowindowGob.open(map, markerGob);
  });

  var infowindowSearch = new google.maps.InfoWindow({
    content: ''+
    '<div class="content info-content">'+
      '<div class="siteNotice">'+
      '</div>'+
      '<h1 class="firstHeading" class="firstHeading">Zone de recherche</h1>'+
    '</div>'
  });
  var searchAreaData = [
    { lat: 48.838057227865434, lng: 2.3095321655273438},
    { lat: 48.82404503886193, lng: 2.3102188110351562},
    //{ lat: 48.81635927146624, lng: 2.3198318481445312},
    { lat: 48.81703747481908, lng: 2.35107421875},
    { lat: 48.81816779335053, lng: 2.3706436157226562},
    { lat: 48.8254012284184, lng: 2.385406494140625},
    { lat: 48.83082561964202, lng: 2.3994827270507812},
    { lat: 48.84460997116043, lng: 2.4022293090820312},
    { lat: 48.859519915404825, lng: 2.3981094360351562},
    { lat: 48.86223033731979, lng: 2.3778533935546875},
    { lat: 48.860423405685076, lng: 2.3613739013671875},
    { lat: 48.86110101269274, lng: 2.3311614990234375},
    { lat: 48.8565834593617, lng: 2.31536865234375}
  ];
  var searchArea = new google.maps.Polygon({
    paths: searchAreaData,
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.1
  });
  searchArea.setMap(map);
  searchArea.addListener('click', function(event) {
    infowindowGob.close();
    infowindowRea.close();
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    infowindowSearch.setPosition({lat: lat, lng: lng});
    infowindowSearch.open(map);
  });

  function afterWrite() {
    $('.typed-cursor').remove();

    $('.map-group').addClass('open');

    _.delay(function () {
      
    }, 1500);

    tools.displayNextButton(function () {
      tools.scrollTo('.map-group');

      tools.displayNextButton(function () {
        
        tools.showAndScroll('.answer');

      });
    });

  };

  $(".write").append('<span></span>');
  if ( App.router.visited() ) {
      $(".write span").css({opacity: '0'})
        .html("Je serai en alternance, je cherche donc <br/> un logement proche de l'école <br />mais pas trop loin de l'entreprise.")
        .animate({opacity: 1}, 200);
      afterWrite();
  } else {
    $(".write span").typed({
      strings: ["Je serai en alternance, ^500je cherche donc <br/> un logement proche de l'école <br />mais pas trop loin de l'entreprise."],
      typeSpeed: 0.1,
      callback: afterWrite,
    });
  }

};