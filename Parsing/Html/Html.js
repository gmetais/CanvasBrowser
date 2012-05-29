CanvasBrowser.Parsing.Html.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Libraries.HtmlParser");
	
};

CanvasBrowser.Parsing.Html.parse = function(html) {
	
	var windowObject = {};
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
			if (windowObject.length == 0 && tagName != "HTML") {
				windowObject.document = new HTMLElement("HTML");
				cursor = windowObject.document;
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
			} else {
				throw "DOM construction error";
			}
		},
		chars: function( text ) {
			// Delete useless duplicated blank chars
			text = text.replace(/\s+/, " ");
			
			results += text;
		},
		comment: function( text ) {
			//results += "<!--" + text + "-->";
		}
	});
	
	console.log(dom);
	
	
	
	
};

HTMLElement = function(tagName, attrs) {
	this.tagName = tagName;
	if (attrs) {
		this.attributes = attrs;
	}
	
};

HTMLElement.prototype = {
	tagName : '',
	attributes : [],
	
	parentNode : '',
	childNodes : [],
	
	appendChild : function(htmlElement) {
		this.childNodes[] = htmlElement;
		htmlElement.setParentNode = this;
	},
	
	getTagName : function() {
		return this.tagName;
	},
	
	getParentNode : function() {
		return this.parentNode;
	}
};