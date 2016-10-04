"use strict";

describe("centrisNotify", function() {

	// Declare our mock toastr object, we only use those two
	// functions in it (yet):
	var mockToastr = {
		success: function success(message, title, options) {

		},
		error: function error(message, title, options) {

		}
	};

	// Then, we declare a mock version of angular-translate.
	// Note that this object might be useful elsewhere, and
	// could therefore perhaps be moved to a shared location.
	var mockTranslate = function mockTranslate(str, param) {
		return {
			then: function(fn) {
				var msg = str;
				if (param !== undefined) {
					str = str + " " + param.value;
				}
				fn(str);
			}
		};
	};

	mockTranslate.instant = function instant(str) {
		return str;
	};

	// Now we"re ready to handle all the wiring:
	beforeEach(module("sharedServices"));

	beforeEach(module(function($provide) {
		$provide.value("toastr", mockToastr);
		$provide.value("$translate", mockTranslate);
	}));

	it("should be correctly defined", inject(function(centrisNotify) {
		expect(centrisNotify).toBeDefined();
	}));

	it("should have 4 functions defined", inject(function(centrisNotify) {
		expect(centrisNotify.success).toBeDefined();
		expect(centrisNotify.error).toBeDefined();
		expect(centrisNotify.successWithParam).toBeDefined();
		expect(centrisNotify.errorWithParam).toBeDefined();
	}));

	it("should call success method of toastr", inject(function(centrisNotify) {
		spyOn(mockToastr, "success");
		spyOn(mockToastr, "error");
		centrisNotify.success("str1");
		expect(mockToastr.success).toHaveBeenCalledWith("str1", "NotificationTitle", {timeOut: 10000});
		expect(mockToastr.error).not.toHaveBeenCalled();
	}));

	it("should call success method of toastr with supplied title", inject(function(centrisNotify) {
		spyOn(mockToastr, "success");
		spyOn(mockToastr, "error");
		centrisNotify.success("str1", "mytitle");
		expect(mockToastr.success).toHaveBeenCalledWith("str1", "mytitle", {timeOut: 10000});
		expect(mockToastr.error).not.toHaveBeenCalled();
	}));

	it("should call error method of toastr", inject(function(centrisNotify) {
		spyOn(mockToastr, "success");
		spyOn(mockToastr, "error");
		centrisNotify.error("str1");
		expect(mockToastr.error).toHaveBeenCalledWith("str1", "NotificationTitle", {timeOut: 10000});
		expect(mockToastr.success).not.toHaveBeenCalled();
	}));

	it("should call error method of toastr with supplied title", inject(function(centrisNotify) {
		spyOn(mockToastr, "success");
		spyOn(mockToastr, "error");
		centrisNotify.error("str1", "some title");
		expect(mockToastr.error).toHaveBeenCalledWith("str1", "some title", {timeOut: 10000});
		expect(mockToastr.success).not.toHaveBeenCalled();
	}));

	it("should call success method of toastr with the correct parameter", inject(function(centrisNotify) {
		spyOn(mockToastr, "success");
		spyOn(mockToastr, "error");
		centrisNotify.successWithParam("str1", 5);
		expect(mockToastr.success).toHaveBeenCalledWith("str1 5", "NotificationTitle", {timeOut: 10000});
		expect(mockToastr.error).not.toHaveBeenCalled();
	}));

	it("should call error method of toastr with the correct parameter", inject(function(centrisNotify) {
		spyOn(mockToastr, "success");
		spyOn(mockToastr, "error");
		centrisNotify.errorWithParam("str1", 5);
		expect(mockToastr.error).toHaveBeenCalledWith("str1 5", "NotificationTitle", {timeOut: 10000});
		expect(mockToastr.success).not.toHaveBeenCalled();
	}));
});