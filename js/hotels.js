var map;
var user_position;
var hotels = [];
var request = new XMLHttpRequest();

$(document).ready(function()
{

//var heightPanel = $(window).height()*.96;
   
   $('#main-container').append("<div class=\"panel\" id=\"hotels\"></div>");
   var newPanel = $('#hotels');
   //newPanel.css('height',heightPanel*4);
   newPanel.append("<div class=\"panelHeader\"><h1>Choose your hotel</h1></div>");
   newPanel.append("<div class=\"panelMap\" id=\"hotelsMap\"></div>");
   //$('#hotelsMap').css('height',heightPanel);
   newPanel.append("<div class=\"panelFlashCard\"></div>");
   //$('#panelFlashCard').css('height',heightPanel*3);
   //<div class=\"panelFlashCardPrev\"></div> <div class=\"panelFlashCardNext\"></div>
   ping ( );
   
   //flashAvatar = "img/hotel.png";
   
   var newFlashCardPanel = newPanel.find('.panelFlashCard');
   for(i=1;i<=25;i++){
   
   var name = "Name";
   var genInfo = "General information about this place";
   var firstSide = "<div class=\"flashCardTitle\">"+name+"</div><div class=\"genInfo\">"+genInfo+"</div>";
   //<img class=\"flashAvatar\" src=\""+flashAvatar+"\"/>
   
   var contactInfo = "Telephone number:<br/>Emal:"
   var secondSide = "<div class=\"buttonPutOnMap\">"+contactInfo+"</div>";
   
   newFlashCardPanel.append("<section class=\"containerCard\"><div class=\"flashCard\" data-reversed=\"false\"><figure class=\"front\">"+firstSide+"</figure><figure class=\"back\">"+secondSide+"</figure></div></section>");
   
   }
})

/*function initialize(map,divID) {
  var myLatlng = new google.maps.LatLng(55.94, -3.17);
  var mapOptions = {
    zoom: 12,
    center: myLatlng
  };
  map = new google.maps.Map(document.getElementById(divID),
      mapOptions);
	  
     var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
}*/

function ping ( )
{
  request.open("GET","http://localhost/guided/php/query.php?sesame_open=hotels",
               false);
  request.send (null);
  request.onreadystatechange = process_data ();
}

function process_data ( )
{
  if (request.readyState != 4 || request.status != 200)
  {
    // Something is wrong with the request and it is not received correctly
    return;
  }
  var data = JSON.parse(request.responseText);
  console.log(data);
  for (var i = 0; i < data.length; i++)
  {
    hotels[i] = new point(data[i].latitude, data[i].longtitude);
    hotels[i].id = data[i].id;
  }
  console.log(hotels);
  if (document.readyState == 'complete') {
    initialize();
  }
  else {
    google.maps.event.addDomListener(window, 'load', initialize);
  }
}

function point (x, y)
{
  this.id;
  this.x = x;
  this.y = y;
  var marker;
  this.placeMarker = function ( ) {
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(x, y),
      map: map
    });
  };
  this.removeMarker = function ( ) {
    if (this.marker == undefined || this.marker == null)
      return;
    this.marker.setMap (null);
    this.marker.setPosition (null);
    this.marker = null;
  };
  this.lessThan = function (obj) {
    alert ("can you tell " + this + " from " + obj);
    return this.x < obj.x || this.y < obj.y;
  };
  this.toString = function () {
    return "x = " + x + " , y = " + y;
  };
};

function point_less_than (first, second) {
//  alert ("Can you tell " + first + " from " + second + "?");
  return first.x < second.x || first.y < second.y;
};

/** Greater than comparison based on the distance
 *  between the user and the target
 */
function distance_user (first, second) {
//  alert ("Can you tell " + first + " from " + second + "?");
  return (Math.sqrt(Math.pow (first.x - user_position.position.lat(), 2) +
                    Math.pow (first.y - user_position.position.lng(), 2)) >
          Math.sqrt(Math.pow (second.x - user_position.position.lat(), 2) +
                    Math.pow (second.y - user_position.position.lng(), 2)));
};

function initialize() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(55.970, -3.150),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  user_position = new google.maps.Marker({
    position: mapOptions.center,
    map: map
  });

  setNearestHotels ( );

  google.maps.event.addListener(map, 'click', mapClick);
}

function placeMarker(position, map) {
  return new google.maps.Marker({
    position: position,
    map: map
  });
}

function place_user_position(position, map) {
  user_position.setPosition (position);
  setNearestHotels ( );
  //map.panTo(position);
}

function mapClick (e)
{
  place_user_position(e.latLng, map);
}

function setNearestHotels ( )
{
  for (var i = 0; i < Math.min(10, hotels.length); i++)
  {
    hotels[i].removeMarker ( );
  }
  hotels.sort(distance_user);
  for (var i = 0; i < Math.min(10, hotels.length); i++)
  {
    hotels[i].placeMarker ( );
  }
}

ping ();