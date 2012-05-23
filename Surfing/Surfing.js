CanvasBrowser.Surfing.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Surfing.Network");
};

CanvasBrowser.Surfing.loadPage = function(url) {
	console.log("Loading page : " + url);
};
