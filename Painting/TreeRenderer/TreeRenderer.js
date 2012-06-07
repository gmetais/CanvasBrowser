CanvasBrowser.Painting.TreeRenderer.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.DOMObjects.RenderObject");
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.DOMObjects.RenderObject.RenderStyle");
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.DOMObjects.RenderObject.RenderRectangle");
};


/**
 * The render tree is a combination between the DOM tree and the styles (CSS and inline styles)
 */
CanvasBrowser.Painting.TreeRenderer.constructRenderTree = function(htmlNode, styles) {
	
	return this.constructSubTree(htmlNode, styles);
	
};

/**
 * Recursive function that creates the RenderTree
 */
CanvasBrowser.Painting.TreeRenderer.constructSubTree = function(node, styles) {
	
	if (node.getNodeType() == CanvasBrowser.DOMObjects.Node.prototype.ELEMENT_NODE
		|| node.getNodeType() == CanvasBrowser.DOMObjects.Node.prototype.DOCUMENT_NODE) {
		
		// Attachment : compute all the defined styles and define the priorities
		node.attachStyle(styles);
		
		var renderObject = new CanvasBrowser.DOMObjects.RenderObject(node);
		
		// If the element is invisible, no need to paint it
		if (renderObject.getRenderMode() != "none") {
			
			var subTree = renderObject;
			
			// find all children, grand children, grand grand children...
			var children = node.getChildNodes();
			for (var i=0, imax=children.length ; i<imax ; i++) {
				var renderChild = this.constructSubTree(children[i], styles);
				if (renderChild) {
					subTree.addRenderChild(renderChild);
				}
			}
			
			return subTree;
		}
	}
	
	return null;
};

