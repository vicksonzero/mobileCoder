// debugger.js
// requires jquery

// workd with div#liveDebug
// debugMode = [debug|info|none]
// watcher = watcher("liveDebug","debug");
// watcher.disable();

/**
 * make_watcher(watchWindowID,debugMode)
 * @param  {string} watchWindowID [description]
 * @param  {string[debug|info|none]} debugMode     [description]
 *
 * injects css with ID {watchWindowID}
 * 
 * @return a logger which can be used to...
 * 
 * watcher.w(str)         display {str} on the watch window, replacing the default field
 * watcher.w(str,name)    display {str} on the watch window, using its own field {name}
 * watcher.rm(name)       remove field {name} from the watch window
 * 
 */
function make_watcher(watchWindowID,debugMode){

	// creates an object to return
	var logger = {};
	logger.DEBUGMODE = debugMode;
	logger.enabled = true;
	logger.tagFilter = [];

	// initialize things
	$(document).ready(function(){
		// inject css
		injectCSS(watchWindowID);

		// populate the watch window
		var t = document.createElement("table");
		$("#"+watchWindowID).append(t);
		logger.defaultP = createTR("default");

		// hide the watch window if not yet done
		if(!logger.enabled) logger.disable();
	});
	
	// methods
	logger.w = function w(str,name){

		// exit if logger is disabled
		if(!logger.enabled) return;

		// jquery holder
		var $nameField,$strField;
		if(name=="" || name === undefined){	// if no name is given
			$strField =  $(logger.defaultP).find("td:nth-child(2)");
			$nameField = $(logger.defaultP).find("td:nth-child(1)");
			name = "";
		}else{		// watch with a name
			var $tr = $("#"+watchWindowID).find("."+name);
			if($tr[0]){		// update field if name already exists
				$strField =  $tr.find("td:nth-child(2)");
				$nameField = $tr.find("td:nth-child(1)");
			}else{			// create a field
				var tr = createTR(name);
				$strField =  $(tr).find("td:nth-child(2)");
				$nameField = $(tr).find("td:nth-child(1)");
			}
		}
		$nameField.html(name);
		$strField.html(str);
	};

	logger.rm = function rm(name){
		if(!logger.enabled) return;
		if(!name) return false;
		if(name!=""){
			var $d = $("#"+watchWindowID).find("."+name);
			if($d[0]){
				$d.remove();
				return $d.get(0);
			}else{
				return false;
			}
		}
	};
	// logger.debug = function debug(){
	// 	if(logger.DEBUGMODE=="none") return;

	// };
	// logger.info = function info(){
	// 	if(logger.DEBUGMODE=="none") return;

	// };

	// enable/disable
	logger.disable = function disable(){
		logger.enabled=false;
		$("#"+watchWindowID).hide();
	};
	logger.enable = function enable(){
		logger.enabled=true;
		$("#"+watchWindowID).show();
	};
	logger.toggle = function toggle(){
		logger.enabled=(!logger.enabled);
		$("#"+watchWindowID).toggle();
	};
	logger.filter = function filter(filters){
		if(typeof filters === "string"){
			filter(filters);
		}else if(filters instanceof Array){
			for(var f in filters){
				filter(filters[f]);
			}
		}else{
			console.log("Wrong type to add filter");
		}

		function filter(ff){
			logger.tagFilter[ff] = true;
			var $d = $("#"+watchWindowID).find("."+ff);
			if($d[0]){
				$($d[0]).hide();
			}
		}
	};
	logger.removeFilter = function unFilter(filters){
		if(typeof filters === "string"){
			rmFilter(filters);
		}else if(filters instanceof Array){
			for(f in filters){
				if(typeof filters[f] === "string"){
					rmFilter(filters[f]);
				}else{
					console.log('"' + filters[f] + '" is not removed from filters');
				}
			}
		}else{
			console.log("Wrong type to remove filter");
		}

		function rmFilter(ff){
			delete logger.tagFilter[ff];
			var $d = $("#"+watchWindowID).find("."+ff);
			if($d[0]){
				$($d[0]).show();
			}
		}
	};


	return logger;

	// private functions
	function injectCSS(divID){
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = "#"+divID+"{"+
			"display:block;"+
			"box-sizing: border-box;"+
			"position:fixed;"+
			"left:0;top:0;"+
			"padding:2px;"+
			"border-radius:5px;"+
			"background-color:rgba(0,0,0,0.4);"+
			"font-family:Lucida Console,Courier New,monospace;"+
			"color:rgb(230,230,230);"+
		"}\n"+
		"#"+divID+" table{"+
			"border-collapse:collapse;"+
		"}\n"+
		"#"+divID+" tr td:nth-child(2){"+
		//"{background-color:rgba(255,255,255,0.1);}";
			"border-left:gray solid thin;"+
		"}\n";
		document.body.appendChild(css);
	}
	function createTR(name){
		var p = document.createElement("tr");
		if(name !== undefined)
			p.className = name;
		p.innerHTML = "<td></td><td></td>";
		$("#"+watchWindowID+" table").append(p);
		if(logger.tagFilter[name]){
			$(p).hide();
		}
		return p;
	}

};
