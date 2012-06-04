CanvasBrowser.Painting.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Painting.TreeRenderer");
	
	CanvasBrowser.canvasContext = CanvasBrowser.canvas.getContext('2d');
};

CanvasBrowser.Painting.renderEntirePage = function(bodyNode) {
	
	var renderTree = CanvasBrowser.Painting.TreeRenderer.constructRenderTree(bodyNode);
	
	CanvasBrowser.debug(renderTree);
	
	
};



