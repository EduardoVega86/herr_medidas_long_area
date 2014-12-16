define([ "jquery", "i18n", "message-bus" ], function($, i18n, bus) {

	var btnHerr = $("<a/>").appendTo("body");
	btnHerr.attr("id", "toggle_herramientas");
	btnHerr.addClass("blue_button");
	btnHerr.html("Herramientas");
	
	btnHerr.click(function(){
		console.log("pinchar");
		bus.send("toggle-herramientas");
	});
	
});