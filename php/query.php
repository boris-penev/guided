<?php

	header ("Access-Control-Allow-Origin: *");

	//cp query.php ..; cp -r includes ..;
	require('includes/application_top.php');

#	$array_input = json_decode ( wh_db_get_input_string ( 'array' ) ) or die();

#	$days = array_values ( $days );

  $request = wh_db_get_input_string ( 'sesame_open' );

  switch ( $request )
	{
  case 'air':
		$out = wh_db_fetch_all_custom ( getAirQuality ( ), MYSQLI_ASSOC );
    break;
  case 'activities':
    $out = wh_db_fetch_all_custom ( getActivities ( ), MYSQLI_ASSOC );
    break;
  case 'cycle':
    $out = wh_db_fetch_all_custom ( getCycle ( ), MYSQLI_ASSOC );
    break;
  case 'hotels':
    $out = wh_db_fetch_all_custom ( getHotels ( ), MYSQLI_ASSOC );
    break;
  case 'libraries':
    $out = wh_db_fetch_all_custom ( getLibraries ( ), MYSQLI_ASSOC );
    break;
  case 'monuments':
    $out = wh_db_fetch_all_custom ( getMonuments ( ), MYSQLI_ASSOC );
    break;
  case 'museums':
    $out = wh_db_fetch_all_custom ( getMuseums ( ), MYSQLI_ASSOC );
    break;
  case 'parks':
    $out = wh_db_fetch_all_custom ( getParks ( ), MYSQLI_ASSOC );
    break;
  case 'playgrounds':
    $out = wh_db_fetch_all_custom ( getPlaygrounds ( ), MYSQLI_ASSOC );
    break;
  default:
    $out = array ();
  }
  if ( $out === false || ! is_array ($out) ) {
		$out = array ();
  }
#  var_dump ($out);
#  echo PHP_EOL;
#  $c = 0;
  foreach ($out as $i => $j) {
    foreach ($out[$i] as $k => $l) {
      $out[$i][$k] = wh_output_string_protected(utf8_encode($out[$i][$k]));
    }
  }
# Yes, the fix above works, late night at Appleton going crazy
# The below code is horrible debug mess I do not want to use again
#  echo $c, PHP_EOL;
#  var_dump ($out);
#  echo PHP_EOL;
  echo json_encode ( $out );
#  foreach ($out as $i => $j) {
#    foreach ($out[$i] as $k => $l) {
#      echo wh_output_string_protected ($l);
#  } }
#  var_dump ( json_encode ( $out ) );
#  if ( json_encode ($out) === false )
#  {
#    echo PHP_EOL;
#    switch (json_last_error()) {
#    case JSON_ERROR_NONE:
#      echo ' - No errors';
#      break;
#    case JSON_ERROR_DEPTH:
#      echo ' - Maximum stack depth exceeded';
#      break;
#    case JSON_ERROR_STATE_MISMATCH:
#      echo ' - Underflow or the modes mismatch';
#      break;
#    case JSON_ERROR_CTRL_CHAR:
#      echo ' - Unexpected control character found';
#      break;
#    case JSON_ERROR_SYNTAX:
#      echo ' - Syntax error, malformed JSON';
#      break;
#    case JSON_ERROR_UTF8:
#      echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
#      break;
#    default:
#      echo ' - Unknown error';
#      break;
#    }
#    echo PHP_EOL;
#  }

	require(DIR_WS_INCLUDES . 'application_bottom.php');

?>
