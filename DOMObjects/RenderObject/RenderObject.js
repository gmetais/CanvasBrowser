// Inspired by the Webkit RenderObject

CanvasBrowser.DOMObjects.RenderObject = function(node, parentWidth) {
	this.node = node;
	node.setRenderObject(this);
	this.renderMode = this.getRenderMode();
	this.children = [];
};

CanvasBrowser.DOMObjects.RenderObject.prototype = {
	
	
	node : null, // the DOM Node object
	containingLayer : null, // the RenderLayer containing the z-index layer
	renderRectangle : null, // the RenderRectangle on the web page
	renderMode : "", // how the block should be rendered
	children : null, // the renderObjects children in the render tree 
	
	/**
	 * Calculates the node position and size
	 */
	layout : function() {
		var renderRectangle = new CanvasBrowser.DOMObjects.RenderObject.RenderRectangle();
		
		if (this.node.parent) {
			var parent = this.node.getParentNode();
			var parentRenderRectangle = parent.getRenderObject().getRenderRectangle();
			
			renderRectangle.top = parentRenderRectangle.top 
							+ parent.getComputedStyle("margin-top") 
							+ parent.getComputedStyle("border-top-width") 
							+ parent.getComputedStyle("padding-top");
							
			renderRectangle.left = parentRenderRectangle.left
							+ parent.getComputedStyle("margin-left")
							+ parent.getComputedStyle("border-left-width")
							+ parent.getComputedStyle("padding-left");
			
			
			// Determine own width
			var width = parentRenderRectangle.internalWidth;
			if (this.renderMode == "block") {
				computedWidth = this.node.getComputedStyle("width");
				if (computedWidth !== null) {
					width = computedWidth;
				}
			}
			renderRectangle.externalWidth = width;
			
			// So far this was the calculation of the "preferred width". Now the minimum and maximum widths must be calculated. 
			// If the preferred width is higher then the maximum width - the maximum width is used. If it is lower then the minimum width (the smallest unbreakable unit) then the minimum width is used.
			// TODO
		
		} else {
			// This is the first node, the HTML node
			var renderRectangle = new CanvasBrowser.DOMObjects.RenderObject.RenderRectangle();
			renderRectangle.top = 0;
			renderRectangle.left = 0;
			renderRectangle.externalHeight = CanvasBrowser.canvas.offsetHeight;
			renderRectangle.externalWidth = CanvasBrowser.canvas.offsetWidth;
		}
		
		// Go over children
		for (var i=0,imax=this.children.length ; i<imax ; i++) {
			this.children[i].layout();
		}
		
		
		this.renderRectangle = renderRectangle;
		
	},
	
	paint : function() {
		// draw element on the page
	},
	
	repaintRect : function() {
		
	},
	
	getRenderMode : function() {
		// can be one of these :
		// none
		// inline
		// block
		// inline_block
		// list_item
		
		// TODO
		
		return "inline";
	},
	
	getRenderRectangle : function() {
		return this.renderRectangle;
	},
	
	addRenderChild : function(child) {
		this.children.push(child);
	}
};
