CanvasBrowser.DOMObjects.RenderObject.RenderStyle = function() {
	this.cssRules = [];
	this.htmlAttributes = [];
};

CanvasBrowser.DOMObjects.RenderObject.RenderStyle.prototype = {
	
	DISPLAY_ENUM : ["none", "inline", "block", "inline-block", "list-item"],
	
	// The css rules defined with CSS
	cssRules : null,
	// The HTML "style" attribute
	styleAttribute : "",
	// Some other HTML attributes, like bgcolor for exemple.
	htmlAttributes : null,

	
	getColor : function() {
		return this.color;
	},
	
	getFontSize : function() {
		return this.font_size;
	},
	
	getComputedStyle : function(name) {
		// TODO (http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#Style_sheet_cascade_order)
		return "";
	},
	
	addRule : function(rule, properties) {
		this.cssRules.push({
			rule : rule, 
			properties : properties
		});
		
		// TODO : sort rules (last one is the most important)
	},
	
	setStyleAttribute : function(styleAttribute) {
		this.styleAttribute = styleAttribute;
	},
	
	addHtmlAttribute : function(name, value) {
		this.htmlAttributes.push({
			name : name,
			value : value
		})
	}
	
};
