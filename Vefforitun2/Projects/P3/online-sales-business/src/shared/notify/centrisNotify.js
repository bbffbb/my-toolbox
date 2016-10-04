"use strict";

/**
 * @ngdoc service
 * @name general.centrisNotify
 * @description
 * A common notification service. Usage:
 *
 * a) inject centrisNotify into your controller/factory/whatever
 * b) at the appropriate time, call one of the following methods:
 *
 * ```js
 *    centrisNotify.success("app.LanguageFileKey");
 *    centrisNotify.error("app.LanguageFileKey");
 *    centrisNotify.successWithParam("app.LanguageKey", someValue);
 *    centrisNotify.errorWithParam("app.LanguageKey", someValue);
 *    centrisNotify.successWithUndo("app.LanguageKey", undoID); // Displays a "Undo" button
 * ```
 *
 *    The first two methods accept an optional second parameter which
 *    is the title of the notification. However, it is preferred
 *    to specify the title in language files under the key "NotificationTitle".
 *    The next two methods will take a string which is a key into a language
 *    file, plus some variable, and inject the value of the variable into
 *    the string. It is assumed that the placeholder inside the string is
 *    on the format {{value}}
 *    The final version - successWithUndo - accepts a single language key
 *    string, as well as another value. This function will display an "undo"
 *    button, and this second parameter will be passed to that function. That
 *    parameter should contain two properties:
 *    * "type" - a string with the type of object being operated on
 *    * "id" - a value (simple or comples) which identifies the object being operated on
 *
 */
angular.module("sharedServices").factory("centrisNotify",
function(toastr, toastrConfig, $translate, $rootScope) {
	var durationMSec = 10000;
	var defaultTitle = "Centris";

	// Is this the correct place for this? Perhaps not. But we
	// want the code to be DRY, and we don't want to
	// repeat this. I.e. there is a support for undo in our
	// custom template (that is the purpose of it!), and
	// there must be a common event handler for the undo.
	// This is as good place as any other (probably better),
	// but if a better place will be found, please move this function!
	$rootScope.centrisUndo = function centrisUndo(type, id) {
		$rootScope.$broadcast("centrisUndo", {type: type, id: id});
	};

	// Load the title to the notification from language files.
	// Since the factory will probably be created at startup,
	// the language files may or may not be properly loaded.
	// Therefore, we use the promise version.
	$translate("NotificationTitle").then(function(value) {
		defaultTitle = value;
	});

	function displayMessage(type, message, title) {
		var options = {
			timeOut: durationMSec
		};

		// In case the previous toast was an undo toast,
		// which overrode the template path:
		toastrConfig.templates.toast = "shared/notify/centris-notify.tpl.html";

		if (type === "success") {
			toastr.success(message, title, options);
		} else if (type === "error") {
			toastr.error(message, title, options);
		}
	}

	// Declare the function which takes care of the actual notification:
	var notificationFunction = function notificationFunction(type, titleKey, messageKey) {
		var message = $translate.instant(messageKey);
		var title   = defaultTitle;

		if (titleKey !== undefined) {
			title = $translate.instant(titleKey);
		}

		displayMessage(type, message, title);
	};

	var displayMessageWithUndo = function displayMessageWithUndo(message, undoID) {
		var options = {
			timeOut: durationMSec
		};

		// Slight hack, but hopefully the library will be able to
		// officcially support per-toast templates in later versions
		toastrConfig.templates.toast = "shared/notify/centris-notify-undo.tpl.html";

		// HACK! Because toastr doesn't allow us to pass in
		// any "Item Data" (see MFC CListCtrl), we need to
		// "sneak" the undoID in somehow differently. Since
		// our custom template hardcodes the title, we
		// don't need to use that parameter, and can pass the
		// undoID in there instead!
		toastr.success(undoID, message, options);
		// Oh and this is also very hackish, we need to switch
		// the title and the message because of some logic
		// in the library (sigh)
	};

	var notificationFunctionWithParam = function notificationFunctionWithParam(type, messageKey, param) {
		$translate(messageKey, { value: param }).then( function(msg) {
			displayMessage(type, msg, defaultTitle);
		});
	};

	var notificationFunctionWithUndo = function notificationFunctionWithUndo(messageKey, undoID) {
		$translate(messageKey).then(function(msg) {
			displayMessageWithUndo(msg, undoID);
		});
	};

	return {
		success: function success(messageKey, titleKey) {
			notificationFunction("success", titleKey, messageKey);
		},
		error: function error(messageKey, titleKey) {
			notificationFunction("error", titleKey, messageKey);
		},
		successWithParam: function successWithParam(messageKey, param) {
			notificationFunctionWithParam("success", messageKey, param);
		},
		errorWithParam: function errorWithParam(messageKey, param) {
			notificationFunctionWithParam("error", messageKey, param);
		},

		// This function only comes in the "success" variation, since
		// we hardly need undo support for messages which only
		// display error messages, do we?
		successWithUndo: function successWithUndo(messageKey, undoID) {
			notificationFunctionWithUndo(messageKey, undoID);
		}
	};
});
