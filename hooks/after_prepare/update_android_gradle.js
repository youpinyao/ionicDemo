#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var stat = fs.stat;

function log(message) {
	console.log(' > copy build-extras.gradle hook: ' + message);
}

module.exports = function(context) {

	var rootdir = context.opts.projectRoot;

	console.log(rootdir)


	function copy(src, dst) {
		fs.writeFileSync(dst, fs.readFileSync(src));

		log('complete')
	}

	if (context.opts.platforms.indexOf('android') >= 0) {
		copy(rootdir + '/hooks/build-extras.gradle', rootdir + '/platforms/android/build-extras.gradle')
	}


}