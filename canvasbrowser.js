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
		
		var callback = function(){alert("callback");};
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.TestTest.Test2", callback);
	},
	
	loadUrl : function(url) {
		
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
		var path = CanvasBrowser.baseUrl + splitedNamespace.slice(1).join("/") + ".js";
		
		// If the namespace's parent doesn't exist, we need to create it.
		// As for the grand-parent and the entire family...
		var parent = document;
		for (var i=0, imax=splitedNamespace.length ; i<imax ; i++) {
			if (typeof parent[splitedNamespace[i]] == 'undefined') {
				parent[splitedNamespace] = {};
			}
		}
		
		// And load the file
		var file = document.createElement('script');
		file.setAttribute("type", "text/javascript");
		file.setAttribute("src", path);
		file.onload = function() {
			// The file is now loaded
			that.loadedNamespaces.push(namespace);
			// If a callback is specified
			if (callback) {
				callback();
			}
		}
		document.body.appendChild(file);
	}
};


// Launch the business
CanvasBrowser = new CanvasBrowserObject();
CanvasBrowser.init();