$(document).ready(function(){

drop($('#planContainer').attr("id"),100)
drop($('#co2Container').attr("id"),600)

})

function drop(id,n){

$('#'+id).delay(n).animate({

marginTop: '0px'

},{ duration: 2000, easing: 'easeOutBounce' })

}