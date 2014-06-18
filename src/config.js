// config.js
// holds all constants that are used to tune the app

var config = (function(watcher){
	var config = {};

	config.ITEMPOINT_RADIUS = 4;
	config.CLUSTER_COUNT = 50;			// number of dots
	config.CLUSTER_SEPARATION = 0.2;	// percentage to the screen
	config.LONG_TAP_TIME = 600;			// time for long tap
	config.SELECT_RADIUS = 20;			// the size of your thumb

	return config;
})(logger);

