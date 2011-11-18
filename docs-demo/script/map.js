var map, ags_buses, ags_director_districts, ags_light_rail, geoiq_ski, cartodb_sewer_line, cartodb_man_hole;

$(function(){  
	
	// Create Map
	map = new google.maps.Map(document.getElementById("map_container"), {
		center: new google.maps.LatLng(/*39.75111061205554, -104.99916731491088*/35.05301, -80.66464),
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
	ags_buses = new gvector.AGS({
	    url: "http://maps.rtd-denver.com/ArcGIS/rest/services/BusLocations/MapServer/0",
	    fields: "*",
	    uniqueField: "OBJECTID",
	    scaleRange: [13, 20],
	    symbology: {
	        type: "range",
	        property: "SPEED",
	        ranges: [
	            {
	                range: [0, 0],
	                vectorOptions: {
	                    icon: "img/markers/bus-black.png"
	                }
	            },{
	                range: [1, 20],
	                vectorOptions: {
	                    icon: "img/markers/bus-brown.png"
	                }
	            },{
	                range: [21, 100],
	                vectorOptions: {
	                    icon: "img/markers/bus-green.png"
	                }
	            }
	        ]
	    },
	    dynamic: true,
	    autoUpdate: true,
	    autoUpdateInterval: 5000,
	    infoWindowTemplate: '<div class="iw-content"><h3>Bus #{VEHICLE_ALIAS}</h3><table><tr><th>Speed</th><td>{SPEED} mph</td></tr><tr><th>Route</th><td>{ROUTE}</td></tr><tr><th>Operator</th><td>{OPERATOR_LNAME},{OPERATOR_FNAME}</td></tr><tr><th>Last GPS Lock</th><td>{LOCKTIME}</td></tr></table></div>'
	});
	
	ags_director_districts = new gvector.AGS({
	    url: "http://maps.rtd-denver.com/ArcGIS/rest/services/DirectorDistricts/MapServer/1",
	    fields: "*",
	    uniqueField: "OBJECTID",
	    showAll: true,
	    scaleRange: [4, 14],
	    where: "DISTRICT+NOT+IN('I','J','K','L','M','N','O')",
	    symbology: {
	        type: "unique",
	        property: "DISTRICT",
	        values: [
	            {
	                value: "A",
	                vectorOptions: {
	                    fillColor: "#6600FF",
	                    fillOpacity: 0.6,
	                    strokeColor: "#666666",
	                    strokeOpacity: 0.8,
	                    strokeWeight: 1
	                }
	            }, {
	                value: "B",
	                vectorOptions: {
	                    fillColor: "#660066",
	                    fillOpacity: 0.6,
	                    strokeColor: "#666666",
	                    strokeOpacity: 0.8,
	                    strokeWeight: 1
	                }
	            }, {
	                value: "C",
	                vectorOptions: {
	                    fillColor: "#FF9900",
	                    fillOpacity: 0.6,
	                    strokeColor: "#666666",
	                    strokeOpacity: 0.8,
	                    strokeWeight: 1
	                }
	            }, {
	                value: "D",
	                vectorOptions: {
	                    fillColor: "#00FFFF",
	                    fillOpacity: 0.6,
	                    strokeColor: "#666666",
	                    strokeOpacity: 0.8,
	                    strokeWeight: 1
	                }
	            }, {
	                value: "E",
	                vectorOptions: {
	                    fillColor: "#FFFF00",
	                    fillOpacity: 0.6,
	                    strokeColor: "#666666",
	                    strokeOpacity: 0.8,
	                    strokeWeight: 1
	                }
	            }, {
	                value: "F",
	                vectorOptions: {
	                    fillColor: "#003333",
	                    fillOpacity: 0.6,
	                    strokeColor: "#666666",
	                    strokeOpacity: 0.8,
	                    strokeWeight: 1
	                }
	            }, {
	                value: "G",
	                vectorOptions: {
	                    fillColor: "#ff7800",
	                    fillOpacity: 0.6,
	                    strokeColor: "#666666",
	                    strokeOpacity: 0.8,
	                    strokeWeight: 1
	                }
	            }, {
	                value: "H",
	                vectorOptions: {
	                    fillColor: "#46461f",
	                    fillOpacity: 0.6,
	                    strokeColor: "#666666",
	                    strokeOpacity: 0.8,
	                    strokeWeight: 1
	                }
	            }
	        ]
	    },
	    infoWindowTemplate: '<div class="iw-content"><h3>District {DISTRICT}</h3><table><tr><th>Links</th><td><a target="_blank" href="{MAP}">Map</a>, <a href="{URL}" target="_blank">Director\'s Website</a></td></tr></table></div>'
	});
	
	ags_light_rail = new gvector.AGS({
	    url: "http://maps.rtd-denver.com/ArcGIS/rest/services/SystemMapLiteGoogleVectors/MapServer/1",
	    fields: "*",
	    uniqueField: "OBJECTID",
	    scaleRange: [13, 20],
	    showAll: true,
	    symbology: {
	        type: "single",
    	    vectorOptions: {
    	        strokeWeight: 7,
    	        strokeOpacity: 0.7,
    	        strokeColor: "#004a00"
    	    }    
	    },
	    infoWindowTemplate: '<div class="iw-content"><h3>Light Rail Line</h3><table><tr><th>Route</th><td>{ROUTE}</td></tr></table></div>'
	});
	
	geoiq_ski = new gvector.GeoIQ({
		dataset: 164880,
		uniqueField: "NAME",
		scaleRange: [6, 20],
		infoWindowTemplate: '<div class="iw-content"><h3>{NAME}</h3></div>',
		symbology: {
		    type: "single",
		    vectorOptions: {
			    icon: "img/markers/ski-lift.png"
		    }
		}
	});
	
	cartodb_sewer_line = new gvector.CartoDB({
	    user: "geojason",
	    table: "sewer_line",
	    scaleRange: [15, 20],
	    symbology: {
	        type: "range",
	        property: "pipe_dia",
	        ranges: [
	            {
	                range: [0, 8],
	                vectorOptions: {
	                    strokeWeight: 4,
	                    strokeColor: "#46461f",
	                    strokeOpacity: 0.8
	                }
	            },{
	                range: [8.00001, 100],
	                vectorOptions: {
	                    strokeWeight: 8,
	                    strokeColor: "#ff7800",
	                    strokeOpacity: 1
	                }
	            }
	        ]
	    },
	    infoWindowTemplate: '<div class="iw-content"><h3>Sewer Line</h3><table><tr><th>Diameter</th><td>{pipe_dia} in.</td></tr><tr><th>Material</th><td>{pipe_mat}</td></tr><tr><th>Flows To</th><td>{wwtp} WWTP</td></tr></table></div>'
	});
	
	cartodb_man_hole = new gvector.CartoDB({
	    user: "geojason",
	    table: "man_hole",
	    scaleRange: [16, 20],
	    symbology: {
	        type: "single",
	        vectorOptions: {
	            icon: new google.maps.MarkerImage('img/markers/manhole.png', new google.maps.Size(16, 16), new google.maps.Point(0, 0), new google.maps.Point(8, 8))
	        }
	    },
	    infoWindowTemplate: '<div class="iw-content"><h3>Man Hole</h3><table><tr><th>Diameter</th><td>{mh_dia} ft.</td></tr><tr><th>Depth</th><td>{mh_depth} ft.</td></tr><tr><th>Address</th><td>{street_add}</td></tr><tr><th>Flows To</th><td>{wwtp} WWTP</td></tr></table></div>'
	});
	
	// Respond to checkbox clicks
	$(".layer").click(function(){
		eval($(this).attr("id")).setMap($(this).attr("checked") ? map : null);
	});
	  
});