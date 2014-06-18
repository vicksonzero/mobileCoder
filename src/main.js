// main.js


// by dickson chui
// works with jquery, watcher-1_0_0.js

// style: private functions are declared after function body
// style: uses closure to avoid polluting global scope, \
//     passing global variables into this closure. \
//     see last line for actual global variables passed
(function(watcher,config,itemPointManager,linearDragger){

	// all event bindings need to be done after onload
	$(document).ready(function() {
		watcher.filter(["pad"]);
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

		}

		var $map = $('#map');
		// let's get some points to play with
		make_some_points($map);

		// 
		var longTapTimer = null;
		var longTapCurrent = {x:0,y:0};
		document.addEventListener('pointerdown', function(evt) {
			evt.preventDefault();
			longTapTimer = setTimeout(function(){long_tap_handler(evt)}, config.LONG_TAP_TIME);
			
			
		});

		document.addEventListener('pointermove', function(evt) {
			evt.maskedEvent.preventDefault();
			evt.maskedEvent.stopPropagation();

			linearDragger.selectItemPoint(evt.x,evt.y);
			longTapCurrent.x = evt.x;
			longTapCurrent.y = evt.y;
		});
		document.addEventListener('pointerup', function(evt) {
			evt.preventDefault();
			
			clearTimeout(longTapTimer);
			linearDragger.endSelectMode();
			watcher.w(false,"longTap");
		});
		// trigger the mouse move events to init
		// if (document.createEvent) {
		// 	var evObj = document.createEvent('MouseEvents');
		// 	evObj.initEvent('mousemove', true, false);
		// 	document.body.dispatchEvent(evObj);

		// }else if (document.createEventObject) {
		// 	document.body.fireEvent('onmousemove');
		// 	document.body.fireEvent('ontouchmove');
		// }

		// bind handler to refresh the screen on resize
		$(window).resize(window_resize_handler);

		// call once to clean up the screen
		window_resize_handler();


		return;

		// private functions
		function make_some_points($map){
			var map_pos = $map.position();
			console.log(map_pos);
			var box = {
				x1:map_pos.left,
				y1:map_pos.top,
				x2:$map.width() + map_pos.left,
				y2:$map.height() + map_pos.top,
				w:$map.width(),
				h:$map.height()
			};
			

			var paddings = config.CLUSTER_SEPARATION*(box.w>box.h?box.w:box.h)/2;
			watcher.w(paddings,"pad");

			var cluster = {
				x:Math.random()*(box.w-2*paddings)+paddings,
				y:Math.random()*(box.h-2*paddings)+paddings
			}
			console.log(cluster);

			for(var i=0; i < config.CLUSTER_COUNT; i++){
				var dx_range = config.CLUSTER_SEPARATION*box.w;
				var dy_range = config.CLUSTER_SEPARATION*box.h;
				var dx = Math.random()*dx_range-dx_range/2;
				var dy = Math.random()*dy_range-dy_range/2;
				console.log(dx,dy);
				itemPointManager.create_item_point(cluster.x + dx, cluster.y + dy);
			}


		}

		function long_tap_handler(event){
			watcher.w(true,"longTap");
			if(Math.abs(longTapCurrent.x - event.x)<5 && 
				Math.abs(longTapCurrent.y - event.y)<5){
				linearDragger.startSelectMode(event.x,event.y,$map.get());
			}else{
				watcher.w(false,"longTap");
			}
		}

		function window_resize_handler() {

		}
	});

})(logger,config,itemPointManager,linearDragger);
