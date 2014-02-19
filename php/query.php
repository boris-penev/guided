<?php

	header ("Access-Control-Allow-Origin: *");

	//cp query.php ..; cp -r includes ..;
	require('includes/application_top.php');

#	$array_input = json_decode ( wh_db_get_input_string ( 'array' ) ) or die();

#	$days = array_values ( $days );

	{
		$air = wh_db_fetch_all_custom ( getAirData ( ), MYSQLI_ASSOC );
#		var_dump ( $air );
		if ( $air === false) {
			$air = array ();
		}
#		echo var_dump ( $air );
		echo json_encode ( $air );
	}

	require(DIR_WS_INCLUDES . 'application_bottom.php');

?>
