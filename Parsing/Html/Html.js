CanvasBrowser.Parsing.Html.init = function() {
	CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Libraries.HtmlParser");
	
};

CanvasBrowser.Parsing.Html.parse = function(html) {
	
	var results = "";
	
	// Convert the HTML to XML ( = strict HTML)
	HTMLParser(html, {
		start: function( tag, attrs, unary ) {
			results += "<" + tag;
	
			for ( var i = 0; i < attrs.length; i++ )
				results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
	
			results += (unary ? "/" : "") + ">";
		},
		end: function( tag ) {
			results += "</" + tag + ">";
		},
		chars: function( text ) {
			text = text.replace(/\s+/, " ");
			
			// TODO : deal with HTML special chars that throw a parsing error (ex: &orcic; = ô)
			
			results += text;
		},
		comment: function( text ) {
			results += "<!--" + text + "-->";
		}
	});
	
	console.log(results);
	
	
	
	
};
