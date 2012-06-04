/**
 * The render tree is a combination between the DOM tree and the styles (CSS and inline styles)
 */
CanvasBrowser.Painting.TreeRenderer.constructRenderTree = function(bodyNode) {
	
	return this.constructSubTree(bodyNode);
	
};

/**
 * Recursive function that creates the RenderTree
 */
CanvasBrowser.Painting.TreeRenderer.constructSubTree = function(node) {
	var subTree = [];
	
	var renderStyle = new CanvasBrowser.DOMObjects.RenderObject.RenderStyle();
	// TODO : complete the renderStyle
	
	var renderObject = new CanvasBrowser.DOMObjects.RenderObject(node, renderStyle);
	subTree.push(renderObject);
	
	var children = node.getChildNodes();
	for (var i=0, imax=children.length ; i<imax ; i++) {
		subTree.push(this.constructSubTree(children[i]));
	}
	
	return subTree;
};

