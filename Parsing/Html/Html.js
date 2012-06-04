CanvasBrowser.Parsing.Html.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Libraries.HtmlParser");
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.DOMObjects", "init");
	
};

CanvasBrowser.Parsing.Html.parse = function(html) {
	
	var domTree = null;
	var cursor = null;
	
	// Convert the HTML to XML ( = strict HTML)
	HTMLParser(html, {
		start: function(tagName, attrs, unary) {
			/*results += "<" + tag;
	
			for ( var i = 0; i < attrs.length; i++ )
				results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
	
			results += (unary ? "/" : "") + ">";*/
			
			tagName = tagName.toLowerCase();
			
			// If it's the first tag, it needs to be an HTML tag, and if it's not, we create it
			if (domTree == null) {
				domTree = new CanvasBrowser.DOMObjects.Node.HTMLDocument();
				cursor = domTree;
				if (tagName == "html") {
					return;
				}
			}
			
			var element = new CanvasBrowser.DOMObjects.Node.HTMLElement(tagName, attrs);
			cursor.appendChild(element);
			
			// If the tag is unary (can't have any child), no need to move the cursor
			if (!unary) {
				cursor = element;
				//CanvasBrowser.debug("Opening tag " + tagName);
			} else {
				//CanvasBrowser.debug("Opening and closing tag " + tagName);
			}
		},
		end: function(tagName) {
			tagName = tagName.toLowerCase();
			
			/*results += "</" + tag + ">";*/
			if (tagName == "html") {
				return;
			}
			
			if (domTree != null && cursor.getTagName() == tagName) {
				cursor = cursor.getParentNode();
				//CanvasBrowser.debug("Closing tag " + tagName);
			}
			else {
				throw "DOM construction error : closing tag " + tagName + " not matching with open tag " + cursor.getTagName();
			}
		},
		chars: function(text) {
			
			if (domTree != null) {
				// Delete useless duplicated blank chars
				text = text.replace(/\s+/, " ");
				
				/*results += text;*/
				var element = new CanvasBrowser.DOMObjects.Node.Text(text);
				cursor.appendChild(element);
				//CanvasBrowser.debug("Writing words...");
			}
		},
		comment: function(text) {
			//results += "<!--" + text + "-->";
		}
	});
	
	if (domTree == null) {
		throw "DOM construction error : can't find any HTML tag";
	}
	
	CanvasBrowser.debug("DOM construction finished :");
	CanvasBrowser.debug(domTree);
	return domTree;
};