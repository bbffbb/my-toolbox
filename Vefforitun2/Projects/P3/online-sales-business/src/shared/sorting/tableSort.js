"use strict";

/**
 * @ngdoc object
 * @name general.tableSort
 * @description
 * Use this directive to sort columns in a table. To use it you add
 * the directive to the table row <tr>, then you have to add data-columnName
 * to each <th> which should be sortable. The directive can take a string
 * parameter which will be used as the default column to be sorted.
 *
 * Note that this directive is currently a bit brutal, i.e. it will remove
 * ALL css classes from the table headings when a column is no longer the default
 * sort column (this may have to change later).
 *
 * Dependencies:
 *
 * * Depends on Font Awesome for the caret icon.
 *
 * @example
 * ```html
 * <!-- a) For each column that should be sortable, add the data-columnName attribute,
 * with the value of the sort expression: -->
 *
 * <tr table-sort="Name">
 *     <th data-columnName="Name">Name</th>
 *     <!-- etc. for each column in the table -->;
 * </tr>
 *
 * <!-- b) in your ng-repeat for the table rows, ensure you are using orderBy filter
 * with predicate and reverse (which are scope variables created by this
 * directive): -->
 *
 * <tr ng-repeat="stuff in stuffz | orderBy:predicate:reverse">
 *
 * <!-- If the sort order should be reversed initially, place a minus sign in front of
 *      the name of the default column: -->
 * <tr table-sort="-Name">
 * ```
 */
angular.module("sharedServices").directive("tableSort", function () {
	function link(scope, element, attrs) {
		var tableChildren = element.children();
		var defaultColumn = attrs.tableSort;
		var reverse = attrs["reverse"] || "reverse";
		var predicate = attrs["predicate"] || "predicate";

		if (defaultColumn.length > 0 && defaultColumn[0] === "-") {
			scope[reverse] = true;
			scope[predicate] = defaultColumn.substring(1);
		} else {
			scope[reverse] = false;
			scope[predicate] = defaultColumn;
		}

		function initClickHandlers() {
			angular.forEach(tableChildren, function(value) {
				var el = angular.element(value);
				var columnName = el.attr("columnName") || el.attr("data-columnName");

				// Only attach a click handler if:
				// a) the <th> element has a non-empty data-columnName attribute.
				// b) there isn't already a click handler there
				if (isSortColumn(columnName)) {
					if (el.attr("ng-click") === undefined) {
						el.bind("click", function(e) {
							scope.$apply(function() {
								sortNotes(columnName);
							});
						});
					}
				}
			});
		}
		initClickHandlers();

		// In case the number of columns is variable (or generated using
		// a ng-repeat), we need to watch for new columns.
		// TODO: doesn't quite work yet!
		/*
		scope.$watch(element.children().length, function(){
			console.log("Length of elements has changed!");
			initClickHandlers();
		});
		*/
		// Setup the columns adding <i> to all table headers and
		// adds caret class to the default column.
		function setup() {
			angular.forEach(tableChildren, function(value) {
				var el = angular.element(value);
				var columnName = el.attr("columnName") || el.attr("data-columnName");
				if (isSortColumn(columnName)) {
					el.prepend("<i></i>");
					if (columnName === defaultColumn || columnName === "'" + defaultColumn + "'") {
						el.children().addClass("fa fa-caret-" + (scope[reverse] ? "up" : "down"));
					}
				}
			});
		}

		function isSortColumn(columnName) {
			return columnName !== undefined && columnName.length > 0;
		}

		function sortNotes(sortBy) {
			if (scope[predicate] === sortBy) {
				scope[reverse] = !scope[reverse];
			}
			scope[predicate] = sortBy;
			angular.forEach(tableChildren, function(value) {
				var el = angular.element(value);
				var columnName = el.attr("columnName") || el.attr("data-columnName");
				if (isSortColumn(columnName)) {
					el.children().removeClass();
					if (scope[predicate] === columnName) {
						el.children().addClass("fa fa-caret-" + (sortDown(sortBy) ? "up" : "down"));
					}
				}
			});
		}

		// Helper function:
		function sortDown(sortType) {
			return scope[reverse] && scope[predicate] === sortType;
		}

		scope.$watch("tableSort", function(value) {
			if (value) {
				defaultColumn = value;
			}
			setup();
		});
	}

	return {
		restrict: "A",
		replace: false,
		link: link
	};
});
