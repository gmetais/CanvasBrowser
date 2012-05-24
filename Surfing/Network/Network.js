CanvasBrowser.Surfing.Network = {
	

	FILE_TYPE_HTML : "html",
	FILE_TYPE_IMAGE : "image",
	
	
	loadFile : function(url, type, callback) {
		
		switch(type) {
			case this.FILE_TYPE_HTML : 
				this.loadXDomainFile(url, callback);
				break;
		}
		
		
	},
	
	loadXDomainFile : function(url, callback) {
		var xdr = this.getXDomainRequest();
		xdr.onload = function() {
			
			callback(xdr.responseText);
		};
		xdr.open("GET", url);
		xdr.send();
	},
	
	/**
	 * Initialize an XMLHTTPRequest 2 (for X domain)
	 */
	getXDomainRequest : function() {
		if (window.XDomainRequest) {
			return new XDomainRequest();
		} else if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
		CanvasBrowser.debug("This browser does not support cross domain AJAX");
	}
	
	
	
};
