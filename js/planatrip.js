
// Designates the number of categories like "History" or "Nature" that
// are currently in the small left-side panel
var interestsPanelEntries = 1;

// This is the height of a panel (the thing that is in the span of the screen
// and is scroller up/down); it is calculated relatively to the screen height
var heightPanel;

var heightFooter;

var mapGlobal;

// the data to be visualized
var data = [];

// the queue for staging queries while still transmitting or
// processing previous ones
var queue = [];

// last element unprocessed element from queue
var last = null;

$(document).ready(function(){

   heightPanel = $(window).height()*.96;
   heightFooter = $(window).height()*.04;
   $('.panel').css('height',heightPanel);
   $('#footer').css('height',heightFooter)
   $('#hotelQuestion').fadeIn(2000);

});

$('#no').click(function(){
  $('#hotelQuestion').fadeOut(800, function(){
    $('#badges').fadeIn(800);
    $('#interestsPanel').animate({
      marginLeft: '0px'
    }, { duration: 500, easing: 'easeOutBounce' })
  });
});

$('#yes').click(function(){
   window.location = "hotels.html";
});

$('.interestsPanelEntry').click(function(){
   var offset = $(this).data("offset");
   scrollTo(offset);
});


function scrollTo(offset){
   $('body,html').animate({ scrollTop: offset }, 800);
};

$('.badge').click(function(){
   var badge = $(this);
   var isPressed = badge.data('pressed');
   var badgeText = badge.text();

   if (isPressed == false) {
      pressBadge(badge, badgeText);
   }
   else {
      unpressBadge(badge, badgeText);
   }
});

function placeMap(badgeText){
   $('#'+badgeText+".panelMap").append("<iframe src=\"map.html\"></iframe>")
};

function initialize(map,divID) {
  var myLatlng = new google.maps.LatLng(55.94, -3.17);
  var mapOptions = {
    zoom: 12,
    center: myLatlng
  };
  map = new google.maps.Map(document.getElementById(divID), mapOptions);

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Hello World!'
  });
}

function constructPanel(badgeText){
   $('#main-container').append("<div class=\"panel\" id=\"" + badgeText +
                               "\"></div>");
   var newPanel = $('#'+badgeText);
   newPanel.css('height',heightPanel);
   newPanel.append("<div class=\"panelHeader\"><h1>"+badgeText+"</h1></div>");
   newPanel.append("<div class=\"panelMap\" id=\""+badgeText+"Map\"></div>");
   newPanel.append("<div class=\"panelFlashCard\"></div>");
   //<div class=\"panelFlashCardPrev\"></div> <div class=\"panelFlashCardNext\"></div>

   request (badgeText)

   initialize(mapGlobal,badgeText+"Map");

   //flashAvatar = "img/hotel.png";

   var newFlashCardPanel = newPanel.find('.panelFlashCard');

   for(i = 1; i <= 5; i++)
   {
     var name = "Name";
     var genInfo = "General information about this place";
     var firstSide = "<div class=\"flashCardTitle\">"+name+"</div><div class=\"genInfo\">"+genInfo+"</div>";
     //<img class=\"flashAvatar\" src=\""+flashAvatar+"\"/>

     var contactInfo = "Telephone number:<br/>Emal:"
     var secondSide = "<div class=\"buttonPutOnMap\">"+contactInfo+"</div>";

     newFlashCardPanel.append("<section class=\"containerCard\">" +
                         "<div class=\"flashCard\" data-reversed=\"false\">" +
                         "<figure class=\"front\">" + firstSide +
                         "</figure><figure class=\"back\">" + secondSide +
                         "</figure></div></section>");
    }
}

function ping ( title )
{
  if ( title != null ) {
    queue.push(chooseQuery (title)); }
  last = queue.pop();
  var request = new XMLHttpRequest ();
  request.open("GET",
    "http://testpilot.x10.mx/guided/php/query.php?sesame_open=" + last, false);
  request.send (null);
  request.onreadystatechange = process_data ();
}

function chooseQuery ( title )
{
  switch ( title )
	{
  case 'Nature':
		return ['activities', 'parks'];
  case 'History':
    return ['museums'];
  case 'Art':
    return ['monuments'];
  case 'Sports':
    return ['activities', 'playgrounds'];
  case 'Study':
    return ['libraries'];
  case 'Commuting':
    return ['cycle'];
  default:
    return [];
  }
}

function process_data ( )
{
  if (request.readyState != 4 || request.status != 200)
  {
    // Something is wrong with the request and it is not received correctly
    return;
  }
  data [last] = JSON.parse(request.responseText);
  for (var i = 0; i < data.length; i++)
  {
    data[last][i].point = new point(data[i][last].latitude, data[i][last].longtitude);
    data[last][i].point.id = data[i].id;
  }
  if (document.readyState == 'complete') {
    initialize();
  }
  else {
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  if ( queue.empty () === false ) {
    return ping; }
}


function pressBadge(badge,badgeText){
   $(badge).css("background", "-webkit-gradient(linear, left top, left bottom," +
                          "color-stop(0%,#ace000), color-stop(100%,#899b00))");
   $(badge).data('pressed', true)

   constructPanel(badgeText);

   var nextElement = $(document).find("[data-number='" +
                     interestsPanelEntries + "']");
   nextElement.text(badgeText);
   nextElement.data('offset', interestsPanelEntries*heightPanel);
   interestsPanelEntries++;
}

function unpressBadge(badge,badgeText){
   $(badge).css("background","grey");
   $(badge).data('pressed', false)

   $('#'+badgeText).remove()

   var removeElement = $('.interestsPanelEntry:contains('+badgeText+')');
   removeElement.data('offset',null);
   removeElement.text("");
   interestsPanelEntries--;
}


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

$( document ).on( "click", ".flashCard", function(){
  flip($(this), $(this).data('reversed'))});

