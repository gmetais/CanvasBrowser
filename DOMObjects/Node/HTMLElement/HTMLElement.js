CanvasBrowser.DOMObjects.Node.HTMLElement = function(tagName, attrs) {
	CanvasBrowser.extendClass(this, CanvasBrowser.DOMObjects.Node);
	this.nodeType = this.ELEMENT_NODE;
	
	this.tagName = tagName;
	this.attributes = attrs ? attrs : [];
	
};

CanvasBrowser.DOMObjects.Node.HTMLElement.prototype = {
	tagName : "",
	attributes : null,
	renderStyle : null,
	renderObject : null,
	
	
	attachStyle : function(documentStyles) {
		
		this.renderStyle = new CanvasBrowser.DOMObjects.RenderObject.RenderStyle();
		
		// Deal with inline style and html styles
		for (var i=0, imax=this.attributes.length ; i<imax ; i++) {
			switch(this.attributes[i].name) {
				case "style" :
					this.renderStyle.setStyleAttribute(this.attributes[i].value);
					break;
				case "bgcolor" : 
					this.renderStyle.addHtmlAttribute("bgcolor", this.attributes[i].value);
					// TODO : transform this into the equivalent css property
					break;
					
				// TODO : complete list
			}
		}
		
		for (var rule in documentStyles) {
		
			// We're looking for a direct tag match
			if (this.getTagName() == rule) {
				this.renderStyle.addRule(rule, documentStyles[rule]);
			}
			
			
			
		}
	},
	
	getAttribute : function(name) {
		for (var i=0, imax=this.attributes.length ; i<imax ; i++) {
			if (this.attributes[i].name == name) {
				return this.attributes[i].value;
			}
		}
		return null;
	},
	
	getTagName : function() {
		return this.tagName;
	},
	
	getTextContent : function() {
		var textContent = "";
		for (var i=0, imax=this.childNodes.length ; i<imax ; i++) {
			// TODO : optimise with an array, push() and join()
			textContent += this.childNodes[i].getTextContent();
		}
		return textContent;
	},
	
	getComputedStyle : function(name) {
		this.renderStyle.getComputedStyle(name);
	},
	
	getAllComputedStyle : function() {
		// TODO
	},
	
	getRenderObject : function() {
		return this.renderObject;
	},
	
	setRenderObject : function(renderObject) {
		this.renderObject = renderObject;
	},
	
	toString : function() {
		return "[HTMLElement]";
	},
	
	getName : function() {
		return this.getTagName();
	}
};