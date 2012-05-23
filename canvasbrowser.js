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
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Surfing", "init");
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Setting");
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Parsing", "init");
		CanvasBrowser.InternalJSLoader.require("CanvasBrowser.Deamoning", "init");

		CanvasBrowser.InternalJSLoader.whenReady(function(url){
			if (url) {
				CanvasBrowser.Surfing.loadPage(url);
			}
		}, this, this.url);
		
	},
	
	debug : function(object) {
		if (CanvasBrowser.Setting.debug && console) {
			console.log(object);
		}
	}
};

CanvasBrowserObject.InternalJSLoader = function() {
	this.namespaces = [];
	this.waitingQueue = [];
};

CanvasBrowserObject.InternalJSLoader.prototype = {
	
	/**
	 * Loads a JS files if it's not already loaded.
	 * @param namespace 
	 */
	require : function(namespace, callback) {
		var that = this;
		
		// Test if the namespace is already loaded
		for (var i=0, imax=this.namespaces.length ; i<imax ; i++) {
			if (this.namespaces[i].name == namespace) {
				// Already loaded or asked. Sorry.
				return;
			}
		}
		this.namespaces.push({
			name:namespace, 
			loaded:false}
		);
		
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
			for (var i=0, imax=that.namespaces.length ; i<imax ; i++) {
				if (that.namespaces[i].name == namespace) {
					that.namespaces[i].loaded = true;
					break;;
				}
			}
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
			
			that.checkIfReady();
		}
		CanvasBrowser.debug("Loading file : " + file.src);
		document.body.appendChild(file);
	},
	
	/**
	 * Executes the function "callback" when there's nothing left to load
	 * @param callback The function to call
	 * @param instance The "this" which will be in use when the function is called
	 * @param [...] Optional arguments to call the function with
	 */
	whenReady : function(callback, instance) {
		var args = [];
		for (var i=2, max=arguments.length ; i<max ; i++) {
			args.push(arguments[i]);
		}
		this.waitingQueue.push({
			callback : callback,
			instance : instance,
			args : args
		});
		
		this.checkIfReady();
	},
	
	checkIfReady : function() {
		// If there is a "whenReady" function, we call it
		if (this.waitingQueue.length > 0) {
			// Check if all the scripts (=namespaces) are loaded
			var isReady = true;
			for (var i=this.namespaces.length ; i-- ; ) {
				if (this.namespaces[i].loaded == false) {
					isReady = false;
					break;
				}
			}
			if (isReady) {
				var task = this.waitingQueue.shift();
				task.callback.apply(task.instance, task.args);
				
				// And restart (if there's another awaiting task)
				this.checkIfReady();
			}
		}
	}
};


// Launch the business
CanvasBrowser = new CanvasBrowserObject();
CanvasBrowser.init();