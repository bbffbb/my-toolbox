"use strict";

angular.module('project3App', ['ngRoute', 'pascalprecht.translate', 'ui.bootstrap', 'sharedServices'])
.config(['$routeProvider', '$translateProvider',
	($routeProvider, $translateProvider) => {
	$routeProvider.when('/', {
		controller: 'SellersController',
		templateUrl: 'components/sellers/index.html'
	}).when('/seller/:sellerId', {
		controller: 'SellerController',
		templateUrl: 'components/seller/index.html'
	}).otherwise({
		redirectTo: '/'
	});

	$translateProvider.useStaticFilesLoader({
    prefix: 'lang_',
    suffix: '.json'
  });

	$translateProvider.use('is');
}]);
