// Inspired by the Webkit RenderObject

CanvasBrowser.DOMObjects.RenderObject = function(node, style) {
	this.node = node;
	this.computedStyle = style;
	
	this.renderMode = this.computedStyle.getRenderMode();
};

CanvasBrowser.DOMObjects.RenderObject.prototype = {
	
	
	node : null, // the DOM Node object
	computedStyle : null, // the RenderStyle object
	containingLayer : null, // the RenderLayer containing the z-index layer
	rectangle : null, // the RenderRectangle on the web page
	
	layout : function() {
		// What is this for ?
	},
	
	paint : function() {
		// draw element on the page
	},
	
	repaintRect : function() {
		
	}
};
