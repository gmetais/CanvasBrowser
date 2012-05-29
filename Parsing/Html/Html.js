CanvasBrowser.Parsing.Html.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Libraries.HtmlParser");
	
};

CanvasBrowser.Parsing.Html.parse = function(html) {
	
	var htmlDocument = null;
	var cursor = null;
	
	// Convert the HTML to XML ( = strict HTML)
	HTMLParser(html, {
		start: function(tagName, attrs, unary) {
			/*results += "<" + tag;
	
			for ( var i = 0; i < attrs.length; i++ )
				results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
	
			results += (unary ? "/" : "") + ">";*/
			
			tagName = tagName.toUpperCase();
			
			// If it's the first element, we add it to the windowObject
			if (htmlDocument == null && tagName != "HTML") {
				htmlDocument = new HTMLDocument();
				cursor = htmlDocument;
				
				if ()
			}
			// TODO : deal with body if we don't have any body
			if (tagName != "BODY" htmlDocument.getBody() == null)
			
			
			if (cursor == null) {
				throw "DOM construction error : can't find parent";
			}
			
			var element = new HTMLElement(tagName, attrs);
			cursor.appendChild(element);
			
			// If the tag is unary (can't have any child), no need to move the cursor
			if (!unary) {
				cursor = element;
			}
		},
		end: function(tagName) {
			/*results += "</" + tag + ">";*/
			if (cursor.getTagName() == tagName) {
				cursor = cursor.getParentNode();
			}
			else {
				throw "DOM construction error : closing tag " + tagName + " not matching with open tag " + cursor.getTagName();
			}
		},
		chars: function(text) {
			// Delete useless duplicated blank chars
			text = text.replace(/\s+/, " ");
			
			/*results += text;*/
			var element = new Text(text);
			cursor.appendChild(element);
		},
		comment: function(text) {
			//results += "<!--" + text + "-->";
		}
	});
	
	console.log(dom);
	
	
	
	
};




/* Documentation : 
 * https://developer.mozilla.org/en/DOM/Node
 */

Node = function() {
	
};

Node.prototype = {
	
	// Node types
	ELEMENT_NODE : 1,
	ATTRIBUTE_NODE : 2,
	TEXT_NODE : 3,
	DATA_SECTION_NODE : 4,
	ENTITY_REFERENCE_NODE : 5,
	ENTITY_NODE : 6,
	PROCESSING_INSTRUCTION_NODE : 7,
	COMMENT_NODE : 8,
	DOCUMENT_NODE : 9,
	DOCUMENT_TYPE_NODE : 10,
	DOCUMENT_FRAGMENT_NODE : 11,
	NOTATION_NODE : 12,
	
	
	attributes : [],
	childNodes : [],
	nodeType : null,
	nodeValue : null,
	parentNode : null,
	
	/**
	 * Returns the top level document of the node
	 */
	getOwnerDocument : function() {
		var node = this;
		while (node.getNodeType() != this.DOCUMENT_NODE) {
			node = node.getParentNode();
		}
		return node;
	},
	
	getNodeType : function() {
		return this.nodeType;
	}
	
	getNodeValue : function() {
		return this.nodeValue;
	},
	
	setNodeValue : function(nodeValue) {
		this.nodeValue = nodeValue;
	},
	
	getParentNode : function() {
		return this.parentNode;
	},
	
	getParentElement : function() {
		if (this.parentNode != null && this.parentNode.getNodeType == this.ELEMENT_NODE) {
			return this.parentNode;
		} else {
			return null;
		}
	},
	
	getTextContent : function() {
		return null;
	},
	
	toString : function() {
		return "[Node]";
	}
};

HTMLDocument = function() {
	CanvasBrowser.extend(this, Node);
	this.nodeType = this.DOCUMENT_NODE;
}

HTMLDocument.prototype = {
	activeElement : null,
	
	getBody : function() {
		for (var i=0, imax=this.childNodes.length ; i<imax ; i++) {
			if (this.childNodes[i].getNodeType() == this.ELEMENT_NODE && this.childNodes[i].getTagName() == "BODY") {
				return this.childNodes[i];
			}
		}
		return null;
	},
	
	getHead : function() {
		for (var i=0, imax=this.childNodes.length ; i<imax ; i++) {
			if (this.childNodes[i].getNodeType() == this.ELEMENT_NODE && this.childNodes[i].getTagName() == "HEAD") {
				return this.childNodes[i];
			}
		}
		return null;
	}
}


HTMLElement = function(tagName, attrs) {
	CanvasBrowser.extend(this, Node);
	this.nodeType = this.ELEMENT_NODE;
	
	this.tagName = tagName;
	if (attrs) {
		this.attributes = attrs;
	}
	
};

HTMLElement.prototype = {
	tagName : "",
	attributes : [],
	
	appendChild : function(htmlElement) {
		this.childNodes[] = htmlElement;
		htmlElement.setParentNode = this;
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
	}
	
	toString : function() {
		return "[HTMLElement]";
	},
	
	getName : function() {
		return this.getTagName();
	}
};


Text = function(content) {
	CanvasBrowser.extend(this, Node);
	
	this.nodeType = this.TEXT_NODE;
	this.textContent = content;
};

Text.prototype = {
	
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