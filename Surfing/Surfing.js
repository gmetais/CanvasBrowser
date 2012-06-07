CanvasBrowser.Surfing.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Surfing.Network");
};

CanvasBrowser.Surfing.loadPage = function(url) {
	CanvasBrowser.debug("Loading page : " + url);
	
	this.Network.loadFile(url, this.Network.FILE_TYPE_HTML, this.onPageLoaded);
	
};

CanvasBrowser.Surfing.onPageLoaded = function(headers, content) {
	CanvasBrowser.debug("Page loaded !");
	var htmlDocument = CanvasBrowser.Parsing.Html.parse(content);
	CanvasBrowser.debug("HTML parsed.");
	
	// TODO : find the CSS files called in the head
	
	CanvasBrowser.Painting.renderEntirePage(htmlDocument);
};
