CanvasBrowser.Painting.TreeRenderer.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.DOMObjects.RenderObject");
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.DOMObjects.RenderObject.RenderStyle");
};


/**
 * The render tree is a combination between the DOM tree and the styles (CSS and inline styles)
 */
CanvasBrowser.Painting.TreeRenderer.constructRenderTree = function(bodyNode, styles) {
	
	return this.constructSubTree(bodyNode, styles);
	
};

/**
 * Recursive function that creates the RenderTree
 */
CanvasBrowser.Painting.TreeRenderer.constructSubTree = function(node, styles) {
	var subTree = [];
	
	if (node.getNodeType() == CanvasBrowser.DOMObjects.Node.prototype.ELEMENT_NODE) {
		
		var renderStyle = new CanvasBrowser.DOMObjects.RenderObject.RenderStyle(node, styles);
		// TODO : complete the renderStyle
		
		var renderObject = new CanvasBrowser.DOMObjects.RenderObject(node, renderStyle);
		subTree.push(renderObject);
		
		// find all children, grand children, grand grand children...
		var children = node.getChildNodes();
		for (var i=0, imax=children.length ; i<imax ; i++) {
			var renderChildren = this.constructSubTree(children[i], styles);
			for (var j=0, jmax=renderChildren.length ; j<jmax ; j++) {
				subTree.push(renderChildren[j]);
			}
		}
	}
	
	return subTree;
};

