$(document).ready(function(){

var heightPanel = $(window).height()*.96;
var map;
   
$('#main-container').append("<div class=\"panel\" id=\"hotels\"></div>");
   var newPanel = $('#hotels');
   newPanel.css('height',heightPanel*4);
   newPanel.append("<div class=\"panelHeader\"><h1>Choose your hotel</h1></div>");
   newPanel.append("<div class=\"panelMap\" id=\"hotelsMap\"></div>");
   $('#hotelsMap').css('height',heightPanel);
   newPanel.append("<div class=\"panelFlashCard\"></div>");
   $('#panelFlashCard').css('height',heightPanel*3);
   //<div class=\"panelFlashCardPrev\"></div> <div class=\"panelFlashCardNext\"></div>
   initialize(map,"hotelsMap");
   
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

function initialize(map,divID) {
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
}