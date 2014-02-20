var map;
var user_position;
var hotels = [];
var data = [];
var panel;
var request = new XMLHttpRequest();

$(document).ready(function()
{

   
   $('#main-container').append("<div class=\"panel\" id=\"hotels\"></div>");
   panel = $('#hotels');
   panel.append("<div class=\"panelHeader\"><h1>Click and choose a hotel nearby!</h1></div>");
   panel.append("<div class=\"panelMap\" id=\"hotelsMap\"></div>");
   panel.append("<div class=\"panelFlashCard\"></div>");
   ping ();
   
   flashCardPanel = panel.find('.panelFlashCard');
   

})

function flip(card,reversed){

   if(reversed===false){
      card.css("-webkit-transform", "rotateY( 180deg )");
      card.data('reversed',true);
   }
   else{
      card.css("-webkit-transform", "rotateY( 0deg )")
      card.data('reversed',false);
   }
}

$( document ).on( "click", ".flashCard", function(){flip($(this),$(this).data('reversed'))});

function ping ( )
{
  request.open("GET","http://172.20.1.82/guided/php/query.php?sesame_open=hotels",
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
  data = JSON.parse(request.responseText);
  //console.log(data);
  for (var i = 0; i < data.length; i++)
  {
    hotels[i] = new point(data[i].latitude, data[i].longtitude);
    hotels[i].id = data[i].id;
  }
  //console.log(hotels);
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

  map = new google.maps.Map(document.getElementById('hotelsMap'),
      mapOptions);

  user_position = new google.maps.Marker({
    position: mapOptions.center,
    map: map,
	icon: './img/green-dot.svg'
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
  map.panTo(position);
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
    removeFlashCard(hotels[i].id);
  }
  flashCardPanel.remove();
  hotels.sort(distance_user);
  panel.append("<div class=\"panelFlashCard\"></div>");
  flashCardPanel = panel.find('.panelFlashCard');
  for (var i = 0; i < Math.min(10, hotels.length); i++)
  {
    hotels[i].placeMarker ( );
    placeFlashCard(hotels[i].id);
  }
}

function placeFlashCard(i){
   
   var name = data[i-1].hotel;
   if(name==""){
      name="-"}
   var owner = data[i-1].owner;
   if(owner==""){
      owner="-"}
   var street = data[i-1].street;
   if(street==""){
      street="-"}
   var grade = data[i-1].grade;
   if(grade==""){
      grade="-"}
   var rooms = data[i-1].rooms;
   if(rooms==""){
      rooms="-"}
   
   //var genInfo = "General information about this place";
   var firstSide = "<div class=\"flashCardTitle\">"+name+"</div><div class=\"genInfo\">"+street+"</div>";
   
   var secondSide = "<div class=\"buttonPutOnMap\">Owner:"+owner+"</div><div class=\"buttonPutOnMap\">Grade:"+grade+"</div><div class=\"buttonPutOnMap\">Rooms:"+rooms+"</div>";
   
   flashCardPanel.append("<section class=\"containerCard\"><div class=\"flashCard\" data-marker=\""+i+"\"data-reversed=\"false\"><figure class=\"front\">"+firstSide+"</figure><figure class=\"back\">"+secondSide+"</figure></div></section>");
   
}

function removeFlashCard(i){
   var element = flashCardPanel.find("[data-marker='" + i + "']");
   element.remove();
}

