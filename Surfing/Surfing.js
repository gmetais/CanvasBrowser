CanvasBrowser.Surfing.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Surfing.Network");
};

CanvasBrowser.Surfing.loadPage = function(url) {
	CanvasBrowser.debug("Loading page : " + url);
	
	this.Network.loadFile(url, this.Network.FILE_TYPE_HTML, this.onPageLoaded);
	
};

CanvasBrowser.Surfing.onPageLoaded = function(content) {
	CanvasBrowser.debug("Page loaded !");
};
