CanvasBrowser.DOMObjects.RenderObject.RenderStyle = function(node, styles) {
	
	// Compute the computed styles
	
	for (var rule in styles) {
		
		// We're looking for a direct tag match
		if (node.getTagName() == rule) {
			this.addRule(rule, styles[rule]);
		}
		
	}
	
};

CanvasBrowser.DOMObjects.RenderObject.RenderStyle.prototype = {
	
	DISPLAY_ENUM : ["none", "inline", "block", "inline-block", "list-item"],
	
	// Ordered table of CSS rules by priority (first is lower priority)
	cssRules : [],
	
	color : "",
	font_size : "",
	
	display : "",
	
	
	getRenderMode : function() {
		
		// TODO
		
		return "inline";
	},
	
	getColor : function() {
		return this.color;
	},
	
	getFontSize : function() {
		return this.font_size;
	},
	
	addRule : function(rule, properties) {
		this.cssRules.push({
			rule : rule, 
			properties : properties
		});
		
		// TODO : sort rules
	}
	
};
