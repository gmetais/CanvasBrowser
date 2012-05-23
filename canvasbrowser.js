CanvasBrowserObject = function() {
	
	// Get the CanvasBrowser.js path, so we can guess the path of any other file
	var pageScripts = document.getElementsByTagName("script");
	var thisScript = pageScripts[pageScripts.length-1];
	var thisScriptUrl = thisScript.src;
	this.baseUrl = thisScriptUrl.substring(0, thisScriptUrl.lastIndexOf("/")+1);
	
	if (thisScript.hasAttribute("url")) {
		this.url = thisScript.getAttribute("url");
	}
};

CanvasBrowserObject.prototype = {
	init : function() {
		this.InternalJSLoader = new CanvasBrowserObject.InternalJSLoader();
		
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Painting", "init");
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Surfing");
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Setting");
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Parsing");
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Deamoning");

		if (this.url) {
			CanvasBrowser.Surfing.loadPage(this.url);
		}
	}
	
};

CanvasBrowserObject.InternalJSLoader = function() {
	this.loadedNamespaces = [];
};

CanvasBrowserObject.InternalJSLoader.prototype = {
	
	/**
	 * Loads a JS files if it's not already loaded.
	 * @param namespace 
	 */
	require : function(namespace, callback) {
		var that = this;
		
		// Test if the namespace is already loaded
		for (var i=1, imax=this.loadedNamespaces.length ; i<imax ; i++) {
			if (this.loadedNamespaces[i] == namespace) {
				// Already loaded. Sorry.
				return;
			}
		}
		
		// Parse the namespace to determine the folder
		var splitedNamespace = namespace.split(".");
		var path = CanvasBrowser.baseUrl + splitedNamespace.slice(1).join("/") + "/" + splitedNamespace[splitedNamespace.length-1] + ".js";
		
		// If the namespace's parent doesn't exist, we need to create it.
		// As for the grand-parent and the entire family...
		var parent = window;
		for (var i=0, imax=splitedNamespace.length ; i<imax ; i++) {
			if (typeof parent[splitedNamespace[i]] == 'undefined') {
				parent[splitedNamespace[i]] = function(){};
			}
			parent = parent[splitedNamespace[i]];
		}
		
		// And load the file
		var file = document.createElement("script");
		file.setAttribute("type", "text/javascript");
		file.setAttribute("src", path);
		file.onload = function() {
			// The file is now loaded
			that.loadedNamespaces.push(namespace);
			// If a callback is specified
			if (callback) {
				if (typeof callback == "function") {
					// It's a function, we call it
					callback();
				} else {
					// It's a string (todo : test if it's a string)
					parent[callback]();
				}
			}
		}
		document.body.appendChild(file);
	}
};


// Launch the business
CanvasBrowser = new CanvasBrowserObject();
CanvasBrowser.init();