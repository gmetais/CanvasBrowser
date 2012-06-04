CanvasBrowser.DOMObjects.Node.HTMLElement = function(tagName, attrs) {
	CanvasBrowser.extendClass(this, CanvasBrowser.DOMObjects.Node);
	this.nodeType = this.ELEMENT_NODE;
	
	this.tagName = tagName;
	if (attrs) {
		this.attributes = attrs;
	}
	
};

CanvasBrowser.DOMObjects.Node.HTMLElement.prototype = {
	tagName : "",
	attributes : [],
	
	
	
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
	
	toString : function() {
		return "[HTMLElement]";
	},
	
	getName : function() {
		return this.getTagName();
	}
};