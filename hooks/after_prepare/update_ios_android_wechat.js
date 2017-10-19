#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var formattor = require('formattor');

function log(message) {
	console.log(' > update_ios_im hook: ' + message);
}

module.exports = function(context) {

	var rootdir = context.opts.projectRoot;
	var ConfigParser = context.requireCordovaModule("cordova-lib/src/configparser/ConfigParser");
	var config = new ConfigParser(path.join(rootdir, "config.xml"));
	var projectName = config.name();
	var xmlHelper = context.requireCordovaModule("cordova-lib/src/util/xml-helpers");

	/*
	 * this method presumes the plist has a <key> tag with the value CFBundleDisplayName and the
	 * next tag is a <string> with the value of the name to display under the icon
	 */


	function findCurentWxappid(filename) {
		var testXml = xmlHelper.parseElementtreeSync(filename);
		var pListKeys = testXml.findall('.//key');
		var pListStrings = testXml.findall('.//string');

		for (var i = 0; i < pListKeys.length; i++) {
			if (pListKeys[i].text === "CFBundleURLName") {

				var bundleDisplayId = pListKeys[i]._id + 1;

				for (var j = 0; j < pListStrings.length; j++) {
					if (pListStrings[j]._id == bundleDisplayId && pListStrings[j].text == 'weixin') {

						bundleDisplayId = pListStrings[j]._id + 3;

						for (var k = 0; k < pListStrings.length; k++) {

							if (pListStrings[k]._id == bundleDisplayId) {

								return pListStrings[k].text;
							}
						}
					}
				}
			}
		}
	}


	/*
	 * this method only replaces the first instance found so we are presuming that the first instance of
	 * <string>display name</string> is the one we care about. 
	 * If cordova/apple ever change the order of the plist
	 * this will need rewriting
	 */
	function replace_string_in_file(filename, to_replace, replace_with) {

		var data = fs.readFileSync(filename, 'utf8');
		var indexfound = data.indexOf(to_replace);
		var result = data.replace(new RegExp(to_replace, 'g'), replace_with);
		fs.writeFileSync(filename, result, 'utf8');
		log('changed im ' + filename + ' from: ' + to_replace + ' to: ' + replace_with);

	}

	//get the name from config.xml <preference name="DisplayName" value="Foo"/> node
	var appid = config.getPreference("WECHATAPPID");
	if (!appid) {
		log('no ios appid specified in config.xml. Add <preference name="WECHATAPPID" value="Foo"/>');
		return;
	}

	if (rootdir) {

		if (context.opts.platforms.indexOf('ios') >= 0) {
			//leaving as array in case ever add some Android apk renaming	 

			var fullfilename = path.join(rootdir, "platforms/ios/" + projectName + "/" + projectName + "-info.plist");

			var preAppid = findCurentWxappid(fullfilename);

			if (fs.existsSync(fullfilename)) {

				replace_string_in_file(fullfilename, '\\$WECHATAPPID', appid);
				preAppid && replace_string_in_file(fullfilename, preAppid, appid);

			} else {
				log("could not find: " + fullfilename);
			}

		}

		if (context.opts.platforms.indexOf('android') >= 0) {


			var fullfilename = path.join(rootdir, "platforms/android/AndroidManifest.xml");


			if (fs.existsSync(fullfilename)) {

				var manifest = xmlHelper.parseElementtreeSync(fullfilename);

				var WXPayEntryActivity = manifest.findall('./application/activity/[@android:name=".wxapi.WXPayEntryActivity"]')[0];
				var WXEntryActivity = manifest.findall('./application/activity/[@android:name=".wxapi.WXEntryActivity"]')[0];

				WXPayEntryActivity && WXPayEntryActivity.find('./intent-filter/data').set('android:scheme', appid);
				WXEntryActivity && WXEntryActivity.find('./intent-filter/data').set('android:scheme', appid);

				fs.writeFileSync(fullfilename, formattor(manifest.write(), {
					method: 'xml'
				}), 'utf8');


				log('set android wechat appid')


			} else {
				log("could not find: " + fullfilename);
			}

		}

	} else {
		log('could not find rootdir');
	}
}