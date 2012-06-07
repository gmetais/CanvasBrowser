CanvasBrowser.DOMObjects.Node.HTMLDocument = function() {
	CanvasBrowser.extendClass(this, CanvasBrowser.DOMObjects.Node.HTMLElement);
	this.nodeType = this.DOCUMENT_NODE;
}

CanvasBrowser.DOMObjects.Node.HTMLDocument.prototype = {
	activeElement : null,
	
	getBody : function() {
		for (var i=0, imax=this.childNodes.length ; i<imax ; i++) {
			if (this.childNodes[i].getNodeType() == this.ELEMENT_NODE && this.childNodes[i].getTagName() == "body") {
				return this.childNodes[i];
			}
		}
		return null;
	},
	
	getHead : function() {
		for (var i=0, imax=this.childNodes.length ; i<imax ; i++) {
			if (this.childNodes[i].getNodeType() == this.ELEMENT_NODE && this.childNodes[i].getTagName() == "head") {
				return this.childNodes[i];
			}
		}
		return null;
	}
}