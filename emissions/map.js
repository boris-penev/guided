    // include mapext.js
	var x = document.createElement('script');
	x.src = 'mapext.js';
	document.getElementsByTagName("head")[0].appendChild(x);
	
	//define map
	var map;
	var directionsService = new google.maps.DirectionsService();
    var mapOptions = { center: new google.maps.LatLng(55.957348,-3.188617), zoom: 13,
		maxZoom: 17,
		minZoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP };
		
	var markers = []
	
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};

	var testData={"max":61,"data":[{"lat":55.97606164261174,"lng":-3.167524298061585,"count":37},{"lat":55.97625761947535,"lng":-3.1677064974280285,"count":40},{"lat":55.97612222100689,"lng":-3.1668209425430387,"count":33},{"lat":55.97613154106993,"lng":-3.1677347525004085,"count":44},{"lat":55.97656159651168,"lng":-3.1697671135535095,"count":29},{"lat":55.97708983193071,"lng":-3.1718665978007716,"count":35},{"lat":55.978171169975184,"lng":-3.179095729387042,"count":39},{"lat":55.971796523478474,"lng":-3.202683051692752,"count":34},{"lat":55.97116915439076,"lng":-3.2061890561141455,"count":35},{"lat":55.97515966846403,"lng":-3.1801419913517557,"count":31},{"lat":55.974595363479565,"lng":-3.183698657992805,"count":36},{"lat":55.95735767395226,"lng":-3.1772935020970303,"count":37},{"lat":55.97268449694157,"lng":-3.173960944291204,"count":38},{"lat":55.97101472838007,"lng":-3.1709458015834633,"count":38},{"lat":55.971595485217996,"lng":-3.1722453417304184,"count":37},{"lat":55.97143971496701,"lng":-3.171615660013009,"count":38},{"lat":55.97274099389003,"lng":-3.173690222846054,"count":38},{"lat":55.9710565294239,"lng":-3.2075957356692624,"count":46},{"lat":55.97059690285692,"lng":-3.206812235260096,"count":32},{"lat":55.97863317857542,"lng":-3.17870908897149,"count":32},{"lat":55.97531173337248,"lng":-3.1622450206397286,"count":35},{"lat":55.974558643081714,"lng":-3.1591934928475167,"count":38},{"lat":55.98006278742217,"lng":-3.2037410183970105,"count":28},{"lat":55.9564240764315,"lng":-3.121296007636781,"count":22},{"lat":55.93362503523111,"lng":-3.1649188898900267,"count":29},{"lat":55.958025340425195,"lng":-3.170409424673305,"count":45},{"lat":55.95911482991629,"lng":-3.1701859874708553,"count":35},{"lat":55.96042770086562,"lng":-3.1700974401244797,"count":41},{"lat":55.960519972811475,"lng":-3.1698438980815635,"count":34},{"lat":55.96196120226292,"lng":-3.1694868519807056,"count":33},{"lat":55.96670667229105,"lng":-3.168476338731735,"count":28},{"lat":55.95752024984322,"lng":-3.1696573016983516,"count":46},{"lat":55.957435330876926,"lng":-3.1662907286942574,"count":46},{"lat":55.95523789341637,"lng":-3.15246503835995,"count":33},{"lat":55.95499273255152,"lng":-3.1488857269284987,"count":42},{"lat":55.95487665573459,"lng":-3.147841118376324,"count":41},{"lat":55.95683952101664,"lng":-3.161819571995571,"count":36},{"lat":55.95774835917082,"lng":-3.170240873638682,"count":41},{"lat":55.93267820811966,"lng":-3.1383478012096884,"count":30},{"lat":55.9554892181243,"lng":-3.1409073247495836,"count":28},{"lat":55.95545349220803,"lng":-3.117343494061932,"count":28},{"lat":55.951621420759224,"lng":-3.107815364685433,"count":24},{"lat":55.95452814802525,"lng":-3.115330632104176,"count":25},{"lat":55.952692608426545,"lng":-3.1126030121421207,"count":33},{"lat":55.957446458646864,"lng":-3.12251097215108,"count":37},{"lat":55.95806758233339,"lng":-3.12140760011264,"count":37},{"lat":55.96347593439949,"lng":-3.193340677757163,"count":37},{"lat":55.95807563698596,"lng":-3.1876958676602034,"count":34},{"lat":55.95813232403743,"lng":-3.2077539636533188,"count":32},{"lat":55.95683984457923,"lng":-3.1974615984435446,"count":31},{"lat":55.95221045157437,"lng":-3.203132867387667,"count":47},{"lat":55.95352048550444,"lng":-3.196878600013423,"count":56},{"lat":55.95198864946351,"lng":-3.204679630709276,"count":43},{"lat":55.952407183094266,"lng":-3.209657933314207,"count":32},{"lat":55.95293060194918,"lng":-3.2094339956477826,"count":31},{"lat":55.95623909715284,"lng":-3.204699514164282,"count":23},{"lat":55.9641498794557,"lng":-3.200747534458564,"count":32},{"lat":55.9612567437608,"lng":-3.1792862944182003,"count":36},{"lat":55.961342750892534,"lng":-3.1796894285454234,"count":37},{"lat":55.951338457065376,"lng":-3.2003990076605513,"count":34},{"lat":55.952093351905184,"lng":-3.194848464452122,"count":38},{"lat":55.955106494281075,"lng":-3.195501919200681,"count":49},{"lat":55.95325740530842,"lng":-3.207265809514725,"count":38},{"lat":55.95658912888582,"lng":-3.188082854809729,"count":41},{"lat":55.93800924222866,"lng":-3.1810935908021953,"count":40},{"lat":55.948592661869895,"lng":-3.186989147402017,"count":40},{"lat":55.94877075648187,"lng":-3.1862258489752997,"count":40},{"lat":55.94906253513527,"lng":-3.1829835866362823,"count":33},{"lat":55.949049462437095,"lng":-3.184344520428251,"count":43},{"lat":55.94403879477867,"lng":-3.2052655224599556,"count":39},{"lat":55.9428698449658,"lng":-3.2099210763214896,"count":32},{"lat":55.94362684633612,"lng":-3.206037388044595,"count":37},{"lat":55.947624040822525,"lng":-3.194230369927405,"count":35},{"lat":55.947341505712195,"lng":-3.194638063346532,"count":43},{"lat":55.947612898384975,"lng":-3.1935253623709157,"count":39},{"lat":55.94767328812724,"lng":-3.1947123396882504,"count":30},{"lat":55.94324847993948,"lng":-3.2024546570255055,"count":33},{"lat":55.94095971702668,"lng":-3.1798543602373646,"count":39},{"lat":55.94065281908136,"lng":-3.18093385981339,"count":34},{"lat":55.94079969228714,"lng":-3.179673360321255,"count":35},{"lat":55.94184787282291,"lng":-3.1986322517033954,"count":29},{"lat":55.92188007872043,"lng":-3.198592059933437,"count":18},{"lat":55.92767590112357,"lng":-3.2078468794228066,"count":26},{"lat":55.946330855410466,"lng":-3.214368960238938,"count":46},{"lat":55.94414687866376,"lng":-3.182049053508358,"count":41},{"lat":55.94542996056168,"lng":-3.183193118893084,"count":50},{"lat":55.94488993272031,"lng":-3.1823439263102755,"count":42},{"lat":55.950390169909475,"lng":-3.186035121835781,"count":52},{"lat":55.940429108612285,"lng":-3.17895756304272,"count":42},{"lat":55.93969487629731,"lng":-3.178679070039824,"count":44},{"lat":55.94653418010832,"lng":-3.212885956607933,"count":48},{"lat":55.94708045556602,"lng":-3.213992048475904,"count":40},{"lat":55.946424553334595,"lng":-3.198373266413785,"count":61},{"lat":55.94650218382483,"lng":-3.1977831218530466,"count":60},{"lat":55.94257692482692,"lng":-3.2935966900395606,"count":31},{"lat":55.94092095014166,"lng":-3.3099864163589814,"count":36},{"lat":55.93891070100285,"lng":-3.3924918111030244,"count":47},{"lat":55.93919505770519,"lng":-3.3983304198137168,"count":40},{"lat":55.93918235871971,"lng":-3.3978656111963654,"count":48},{"lat":55.956455552194306,"lng":-3.2417417502436536,"count":35},{"lat":55.957622256614094,"lng":-3.2481227676478515,"count":30},{"lat":55.961143185183566,"lng":-3.257143667935095,"count":28},{"lat":55.957993624640935,"lng":-3.2496085143138016,"count":26},{"lat":55.956977957681595,"lng":-3.2469646779246757,"count":28},{"lat":55.95717073671947,"lng":-3.247451451121404,"count":32},{"lat":55.945516085046556,"lng":-3.279778123035274,"count":21},{"lat":55.96046965227341,"lng":-3.3038058885818007,"count":16},{"lat":55.9572190587487,"lng":-3.2471166023647373,"count":40},{"lat":55.96031450464083,"lng":-3.3006285942647016,"count":25},{"lat":55.960838801813054,"lng":-3.3020399897427453,"count":26},{"lat":55.960762703330396,"lng":-3.302437954156847,"count":50},{"lat":55.96084355469835,"lng":-3.3024406696968693,"count":30},{"lat":55.94568825986952,"lng":-3.2329255240039254,"count":38},{"lat":55.9426930690231,"lng":-3.2790284753595818,"count":38},{"lat":55.94264448391964,"lng":-3.278514450165388,"count":44},{"lat":55.942598911887515,"lng":-3.279441715801918,"count":52},{"lat":55.94331528915286,"lng":-3.2865913572183003,"count":32},{"lat":55.96139698572778,"lng":-3.304493930944965,"count":32},{"lat":55.93736682653058,"lng":-3.2247997982957752,"count":48},{"lat":55.93825240773928,"lng":-3.2234027382253454,"count":36},{"lat":55.93756892441676,"lng":-3.224357867019126,"count":51},{"lat":55.93758068699851,"lng":-3.2249826683042793,"count":32},{"lat":55.92118880535409,"lng":-3.295284849011283,"count":32},{"lat":55.93850656991817,"lng":-3.2285664259251234,"count":39},{"lat":55.9307387882882,"lng":-3.2529893067591984,"count":33},{"lat":55.93927703092781,"lng":-3.2251963269915844,"count":49},{"lat":55.931757504464784,"lng":-3.2491320750466848,"count":42},{"lat":55.939296112663456,"lng":-3.2250848471927687,"count":43},{"lat":55.939059115511064,"lng":-3.222707643542948,"count":38},{"lat":55.90219460954169,"lng":-3.287213310408524,"count":24},{"lat":55.94392609563231,"lng":-3.2303073469569665,"count":41},{"lat":55.933810450623795,"lng":-3.2326763186554426,"count":46},{"lat":55.93353469081008,"lng":-3.2332919278800794,"count":43},{"lat":55.931348432038824,"lng":-3.2362320692536426,"count":31}]};
	var dataReal = [];
	for ( var i = 0; i < testData.data.length; i++ )
	{
		dataReal.push({location: new google.maps.LatLng(testData.data[i].lat,testData.data[i].lng),weigth: testData.data[i].count});
	}
	var pointArray = new google.maps.MVCArray(dataReal);
	
	function toggleHeatmap() {
		heatmap.setMap(heatmap.getMap() ? null : map);
	}
	
    function initialize() {
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		google.maps.event.addListener(map, 'idle', function() {
			bounds = map.getBounds();
			yS = bounds.getSouthWest().lat();
			yE = bounds.getNorthEast().lat();
			xS = bounds.getSouthWest().lng();
			xE = bounds.getNorthEast().lng();
			yD = yS-yE;
			xD = xS-xE;
			expected = zoomInterpolation( map.getZoom() );
			for ( var i = 0; i < markers.length; i++ )
			{
				if ( ( !bounds.contains(markers[i].start) && !bounds.contains(markers[i].destination) ) || ( markers.length > expected ) )
				{
					markers[i].setMap(null);
					markers[i]=null;
					markers.remove(i);
					i--;
				}
			}
			//markers = [];
			recursive_gen = function(i) {
				if ( i < 0 )
					return;
				setTimeout(function() { 
					randomY1 = yE + Math.random()*yD;
					randomX1 = xE + Math.random()*xD;
					randomY2 = yE + Math.random()*yD;
					randomX2 = xE + Math.random()*xD;
					p1 = new google.maps.LatLng(randomY1,randomX1);
					p2 = new google.maps.LatLng(randomY2,randomX2);
					type = Math.floor( 4*Math.random() );
					calcRoute(p1,p2,type);
					recursive_gen(i-1);
				}, 350);	
			}
			recursive_gen(expected - markers.length);
		});
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		heatmap = new google.maps.visualization.HeatmapLayer({
			data: pointArray,
			radius:85,
			opacity:0.3
		});
		
		heatmap.setMap(map);
		var trafficLayer = new google.maps.TrafficLayer();
		trafficLayer.setMap(map);
    }
	
	function zoomInterpolation ( x ) {
		return -19730+(63181*x)/12-(4181*x*x)/8+(275*x*x*x)/12-(3*x*x*x*x)/8;
	}
	
	// generation of the route between two points and animate it
    function calcRoute(start,end,type) {
		var request = {
			origin:start,
			destination:end,
			travelMode: google.maps.TravelMode.DRIVING,
		};
		polyline = 3;
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				polyline = genPolyline(response);
				addMarker(polyline, type );
			}
			else{
				//alert(status);
			}
		});
	}
	
	// generation of polylines from the response of DirectionService
	function genPolyline(result){
		var polyline = new google.maps.Polyline({
			path: [],
			strokeColor: '#FFFF00',
			strokeWeight: 0
		});
		
		var legs = result.routes[0].legs;
		for (i=0;i<legs.length;i++) {
			var steps = legs[i].steps;
			for (j=0;j<steps.length;j++) {
				var nextSegment = steps[j].path;
				for (k=0;k<nextSegment.length;k++) {
					polyline.getPath().push(nextSegment[k]);
				}
			}
		}
		polyline.setMap(map);
		return polyline;
	}
	
	// adding marker and animating it
    function addMarker(polyline, type_num) {
		var marker = createMarker(new Type(type_num));
		var distance = polyline.inKm()*1000;
		move = function(marker, dist, wait,dir,polyline) {
			dist += dir*marker.type.speed;
			additional = 0;
			point = polyline.GetPointAtDistance(dist);
			if ( point === null )
			{
				dir = -dir;
				additional = 1000;
				point = polyline.GetPointAtDistance(dist);
			}
			else
			{
				marker.emission += marker.type.speed*marker.type.emission/1000;
				marker.total_distance += marker.type.speed/1000;
				marker.setPosition(point);
			}
			// call the next "frame" of the animation
			setTimeout(function() { 
				move(marker, dist, wait,dir,polyline); 
			}, wait+additional);
		}

        // begin animation, send back to origin after completion
        move(marker, 0, 30, 1,polyline);
		markers.push(marker);
    }
	function Type(type_index)
	{
	  switch(type_index)
	  {
		case 0:
			this.picture = "car.png";
			this.speed = 8;
			this.caption = "Car";
			this.emission = 271;
			break;
		case 1:
			this.picture = "bus.png";
			this.speed = 7;
			this.caption = "Bus";
			this.emission = 101;
			break;
		case 2:
			this.picture = "bicycle.png";
			this.speed = 4;
			this.caption = "Cyclist";
			this.emission = 21;
			break;
		default:
			this.picture = "walking.png";
			this.speed = 1;
			this.caption = "Pedestrian";
			this.emission = 115;
	  }
	}
	function createMarker(type){
		var marker = new google.maps.Marker({
			map: map,
			position: polyline.getPath().getAt(0),
			start: polyline.getPath().getAt(0),
			destination: polyline.getPath().getAt(polyline.getPath().getLength()-1),
			icon: type.picture
		});
		var infowindow = new google.maps.InfoWindow({content:"<center>"+type.caption+'</center>',initHTML:"<center>"+type.caption+'</center>' });
		google.maps.event.addListener(marker, 'click', function() {
			var updateReadings = function (infowindow) {
				if ( infowindow.hidden )
					return;
				var temp = infowindow.initHTML +
						   "<br />CO<sub>2</sub> emissions: " + (marker.emission/1000).toFixed(3) + " kg" +
						   "<br />Total Distance: " + (marker.total_distance).toFixed(3) + " km";
				infowindow.setContent(temp);
				setTimeout( function() { 
					updateReadings( infowindow );
				}, 400);
			}
			infowindow.open(map,marker);
			updateReadings(infowindow);
		});
		marker.emission = 0;
		marker.total_distance = 0;
		marker.type = type;
		return marker;
	}
	function predict_data(point)
	{
		fix = 0;
		score = 0;
		for (var i = 0; i < testData.data.length; i++ )
		{
			d = Math.sqrt((testData.data[i].lat-point.lat())*(testData.data[i].lat-point.lat()) + (testData.data[i].lng-point.lng())*(testData.data[i].lng-point.lng()) );
			sim = 1/(1+d);
			fix += sim;
			score += testData.data[i].count*sim;
		}
		return score/fix;
	}
	//alert(predict_data(new google.maps.LatLng(55.973414,-3.17035)));

   
google.maps.event.addDomListener(window, 'load', initialize);