CanvasBrowser.DOMObjects.Node.Text = function(content) {
	CanvasBrowser.extendClass(this, CanvasBrowser.DOMObjects.Node);
	
	this.nodeType = this.TEXT_NODE;
	this.textContent = content;
};

CanvasBrowser.DOMObjects.Node.Text.prototype = {
	
	textContent : "",
	
	getTextContent : function() {
		return this.textContent;
	},
	
	getWholeText : function() {
		var parentChildNodes = this.parentNode.childNodes;
		var text = "";
		for (var i=0,imax=parentChildNodes.length ; i<imax ; i++) {
			if (parentChildNodes[i].getNodeType() == this.TEXT_NODE) {
				// TODO optimize with an array, push() and join()
				text += parentChildNodes[i].getTextContent();
			}
		}
		return text;
	},
	
	toString : function() {
		return "[Text]";
	},
	
	getName : function() {
		return "#text";
	}
	
};