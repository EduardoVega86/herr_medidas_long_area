/*define([ "jquery", "i18n", "customization", "message-bus" ], function($, i18n, customization, bus) {
console.log("ho");
	bus.listen("toggle-herramientas", function() {
		console.log("alert");
		alert ("herramientas");
	});


});*/

define([ "jquery", "i18n", "customization", "message-bus", "map" ], function($,
		i18n, customization, bus, map) {

	/*
	 * keep the information about layer legends that will be necessary when they
	 * become visible
	 */

	var dialog = null;
	var divContent = null;

	
	measureControls = {
		line : new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
			persist : true,
			handlerOptions : {
				layerOptions : {

				}
			}
		}),
		polygon : new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
			persist : true,
			handlerOptions : {
				layerOptions : {

				}
			}
		}),

	};
	var control;
	for ( var key in measureControls) {
		control = measureControls[key];
		control.events.on({
			"measure" : handleMeasurements,
			"measurepartial" : handleMeasurements
		});
		map.addControl(control);
	}
	
	function handleMeasurements(event) {
		var geometry = event.geometry;
		var units = event.units;
		var order = event.order;
		var measure = event.measure;
		var element = document.getElementById('resultado_medidas_output');
		var out = "";
		
		if (order == 1) {
			out += "distancia: " + measure.toFixed(3) + " " + units;
		} else {
			out += "area: " + measure.toFixed(3) + " " + units + "2";
		}
		
		element.innerHTML = out;
		//alert(out);

	}

	var getDialog = function() {
		if (dialog == null) {
			dialog = $("<div/>");
			dialog.attr("title", "Herramientas");
			dialog.attr("id", "herr_med_long_area_pane");
			divContent = $("<div/>");
			divContent.appendTo(dialog);
			
			

			var btnLng1 = $("<input/>").attr("type", "radio").attr("id",
					"lineToogle").attr("name", "type").appendTo(divContent);

			$("<label/>").html("Calculo_Distancia").attr("id", "label")
					.appendTo(divContent);
			$("<br/>").appendTo(divContent);

			var btnLng2 = $("<input/>").attr("type", "radio").attr("id",
					"polygonToggle").attr("name", "type").appendTo(divContent);
			$("<label/>").html("Calculo_Area").attr("id", "label").appendTo(
					divContent);
			
			divResult = $("<div/>").attr("id","resultado_medidas_output");
			divResult.appendTo(divContent);
	

			

			btnLng1.click(function() {
				bus.send("activate-exclusive-control", measureControls["line"]);
			})
			btnLng2.click(function() {
				bus.send("activate-exclusive-control", measureControls["polygon"]);
			})
			

		

			divContent.attr("id", "herr_medida_lon_area_pane_content");
			dialog.dialog({
				position : {
	                my : "right top",
	                at : "right bottom+15",
	                of : "#toggle_herramientas"
	            },
				closeOnEscape : false,
				autoOpen : false,
				height : 100,
				minHeight : 200,
				maxHeight : 200,
				width : 190,
				zIndex : 2000,
				resizable : false,
				close : function() {
					
					bus.send("activate-default-exclusive-control");
				}
			});
		}

		return dialog;
	};

	bus.listen("toggle-herramientas", function() {

		var dialog = getDialog();
		if (!dialog.dialog("isOpen")) {
			getDialog().dialog("open");
		} else {
			getDialog().dialog("close");
		}
	});

});