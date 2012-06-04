/**
 * Nothing in common with the famous nodeJS ;o)
 */

/* Documentation : 
 * https://developer.mozilla.org/en/DOM/Node
 */

CanvasBrowser.DOMObjects.Node = function() {
	this.attributes = [];
	this.childNodes = [];
};

CanvasBrowser.DOMObjects.Node.prototype = {
	
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
	
	
	attributes : null,
	childNodes : null,
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
	},
	
	getNodeValue : function() {
		return this.nodeValue;
	},
	
	setNodeValue : function(nodeValue) {
		this.nodeValue = nodeValue;
	},
	
	getChildNodes : function() {
		return this.childNodes;
	},
	
	appendChild : function(node) {
		this.childNodes.push(node);
		node.setParentNode(this);
	},
	
	getParentNode : function() {
		return this.parentNode;
	},
	
	setParentNode : function(parentNode) {
		this.parentNode = parentNode;
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