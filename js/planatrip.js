
// designates the number of cathegories like "History" or "Nature" that 
// are currently in the small left-side panel
var interestsPanelEntries = 1;

// this is the height of a panel (the thing that is in the span of the screen and
// is scroller up/down); it is calculated relatively to the screen height
var heightPanel;

var heightFooter;

var mapNature;

$(document).ready(function(){
    
   heightPanel = $(window).height()*.96;
   heightFooter = $(window).height()*.04;
   $('.panel').css('height',heightPanel);
   $('#footer').css('height',heightFooter)
   $('#hotelQuestion').fadeIn(2000);

})

$('#no').click(function(){

   $('#hotelQuestion').fadeOut(800, function(){
                                               $('#badges').fadeIn(800);
											   $('#interestsPanel').animate({
											                        marginLeft: '0px'
												                    }, { duration: 500, easing: 'easeOutBounce' }) 
											  })

})

$('.interestsPanelEntry').click(function(){
   var offset = $(this).data("offset");
   scrollTo(offset);

})


function scrollTo(offset){
   $('body,html').animate({
				  scrollTop: offset
			      }, 800)
}

$('.badge').click(function(){
   var badge = $(this);
   var isPressed = badge.data('pressed');
   var badgeText = badge.text();
   
   if(isPressed == false){
      pressBadge(badge,badgeText);
   }
   else{
      unpressBadge(badge,badgeText);
   }
})

function placeMap(badgeText){

   $('#'+badgeText+".panelMap").append("<iframe src=\"map.html\"></iframe>")

}

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

function constructPanel(badgeText){
   $('#main-container').append("<div class=\"panel\" id=\""+badgeText+"\"></div>");
   var newPanel = $('#'+badgeText);
   newPanel.css('height',heightPanel);
   newPanel.append("<div class=\"panelHeader\"><h1>"+badgeText+"</h1></div>");
   newPanel.append("<div class=\"panelMap\" id=\""+badgeText+"Map\"></div>");
   newPanel.append("<div class=\"panelFlashCard\"></div>");
   
   initialize(mapNature,badgeText+"Map");
   
   var newFlashCardPanel = newPanel.find('.panelFlashCard');
   for(i=1;i<=5;i++){
   newFlashCardPanel.append("<div class=\"flashCard\">"+i+"</div>");
   }
   
}

function pressBadge(badge,badgeText){
   $(badge).css("background","-webkit-gradient(linear, left top, left bottom, color-stop(0%,#ace000), color-stop(100%,#899b00))");
   $(badge).data('pressed', true) 
	
   constructPanel(badgeText);	
   //$('#main-container').append("<div class=\"panel\" id=\""+badgeText+"\">"+badgeText+"</div>");
   //$('#'+badgeText).css('height',heightPanel);
   
   var nextElement = $(document).find("[data-number='" + interestsPanelEntries + "']");
   nextElement.text(badgeText);
   nextElement.data('offset', interestsPanelEntries*heightPanel)
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
