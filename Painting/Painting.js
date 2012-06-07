CanvasBrowser.Painting.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Painting.TreeRenderer", "init");
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Painting.LayoutCalculator");
	
	CanvasBrowser.canvasContext = CanvasBrowser.canvas.getContext('2d');
};

CanvasBrowser.Painting.renderEntirePage = function(htmlNode, styles) {
	
	var styles = this.getBrowserDefaultStyles();
	
	CanvasBrowser.debug("Constructing the render tree...");
	var renderTree = CanvasBrowser.Painting.TreeRenderer.constructRenderTree(htmlNode, styles);
	CanvasBrowser.debug(renderTree);
	
	CanvasBrowser.debug("Starting layout...");
	renderTree.layout();
	CanvasBrowser.debug(renderTree);
	
};

CanvasBrowser.Painting.getBrowserDefaultStyles = function() {
	return {
		"a" : {
			"color" : "#0000FF",
			"text-decoration" : "underline"
		},
		"h1" : {
			"font-size" : "2em",
			"margin-top" : ".67em",
			"margin-bottom" : ".67em"
		},
		"h2" : {
			"font-size" : "1.5em",
			"margin-top" : ".75em",
			"margin-bottom" : ".75em"
		},
		"h3" : {
			"font-size" : "1.17em",
			"margin-top" : ".83em",
			"margin-bottom" : ".83em"
		}
	};
};



