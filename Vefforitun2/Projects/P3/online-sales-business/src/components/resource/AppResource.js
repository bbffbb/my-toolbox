"use strict";

/**
 * This module serves as the main resource object for our app, i.e.
 * the object which connects to our REST backend and loads/saves data.
 */
angular.module("project3App").factory("AppResource",
function AppResource() {

	// A helper function to create a seller object.
	// Note that this is only a helper to generate
	// mock data, and is not a part of our business logic!
	function createSeller(id, name, category, img, numberOfProducts) {
		return {
			id: id,
			name: name,
			category: category,
			imagePath: img,
			numberOfProducts: numberOfProducts
		};
	}

	// Another helper function.
	function createProduct(sellerid, id, productName, price, quantitySold, quantityInStock, path) {
		return {
			id: sellerid,
			product: {
				id: id,
				name: productName,
				price: price,
				quantitySold: quantitySold,
				quantityInStock: quantityInStock,
				imagePath: path
			}
		};
	}

	// Out mock data. Note that this is just to help us
	// during development!
	var mockSellers = [
		createSeller(1, "Hannyrðaþjónusta Hannesar", "Fatnaður", "http://i.imgur.com/OYVpe2W.jpg?fb", 20),
		createSeller(2, "Smíðaverkstæði Sigríðar", "Skartgripir", "https://i.imgur.com/ywaPivVh.jpg", 0),
		createSeller(3, "Sælgætisgerð Sjonna og Súsí", "Matvörur", "http://i.imgur.com/IuL474x.jpg", 2),
		createSeller(4, "Leirkeraverkstæði Lomma", "Keramik", "https://upload.wikimedia.org/wikipedia/commons/6/67/Potter_at_work,_Jaura,_India.jpg", 0),
		createSeller(5, "AndriFlandri", "Fatnaður", "https://upload.wikimedia.org/wikipedia/commons/6/67/Potter_at_work,_Jaura,_India.jpg", 0)

	];

	var nextSellerID = 6;

	var mockProducts = [
		createProduct(1,  1, "Ullarvettlingar",  1899, 500, 12, "http://i.imgur.com/MZOmRnH.jpg"),
		createProduct(1,  2, "Ullarsokkar",      2199, 488,  9, "http://i.imgur.com/0XKznD4.jpg?1"),
		createProduct(1,  3, "Trefill",           999, 600, 23, "http://i.imgur.com/50ivFlC.jpg"),
		createProduct(1,  4, "Sjal",             2399, 120, 65, "https://farm6.static.flickr.com/5205/5298302908_fb75ed8e0a.jpg"),
		createProduct(1,  5, "Húfa",             1799, 700, 11, "http://purnahandmade.com/media/catalog/product/cache/1/image/ab49223884317513dca074f3bc642368/p/h/phc_malle_08_orwh.jpg"),
		createProduct(1,  6, "Bjórvettlingar",   2649,  12, 99, "https://img1.etsystatic.com/050/1/5847299/il_214x170.730058347_mt4x.jpg"),
		createProduct(1,  7, "Jakki",            4499,  23, 14, "http://www.newmanmayahandicraft.com.np/wp-content/uploads/2015/10/woolen-jacket-with-multicolored-design.jpg"),
		createProduct(1,  8, "Peysa",            5899, 122,  1, "https://upload.wikimedia.org/wikipedia/commons/7/75/Selburose-sweater.jpg"),
		createProduct(1,  9, "Lambhúshetta",     2499, 322,  4, "https://upload.wikimedia.org/wikipedia/commons/9/9a/Balaclava_3_hole_black.jpg"),
		createProduct(1, 10, "Buxur",            4299,  73,  5, ""),
		createProduct(1, 11, "Grifflur",         1299,  98,  9, ""),
		createProduct(1, 12, "Teppi",             499, 819, 98, "https://pixabay.com/static/uploads/photo/2015/11/07/14/40/fabric-1031932_960_720.jpg"),
		createProduct(1, 13, "Sokkar",            499, 991, 23, "https://upload.wikimedia.org/wikipedia/commons/4/42/HandKnittedWhiteLaceSock.jpg"),
		createProduct(1, 14, "Bindi",             899,  25, 22, ""),
		createProduct(1, 15, "Slaufa",            499, 552, 54, "https://pixabay.com/static/uploads/photo/2015/04/20/21/39/bow-tie-732289_960_720.jpg"),
		createProduct(1, 16, "Hnéháir sokkar",   2499,  93, 42, "https://upload.wikimedia.org/wikipedia/commons/c/cf/Argyle_(PSF).png"),
		createProduct(1, 17, "Barnatrefill",      999,  39, 11, "https://upload.wikimedia.org/wikipedia/commons/a/a4/Well-clothed_baby.jpg"),
		createProduct(1, 18, "Hneppt peysa",     4499,  19,  9, "https://upload.wikimedia.org/wikipedia/commons/4/4d/1940_Trachtenstrickjacke_anagoria.JPG"),
		createProduct(1, 19, "Hvítir vettlingar", 499, 241,  0, "https://pixabay.com/static/uploads/photo/2014/05/05/22/15/gloves-338614_960_720.jpg"),
		createProduct(1, 20, "Úlnliðshlífar",    1499,  34,  0, "https://pixabay.com/static/uploads/photo/2015/11/07/17/20/hands-1032312_960_720.jpg"),
		createProduct(3, 21, "Kókoskúlur",        499, 100, 5000, "https://upload.wikimedia.org/wikipedia/commons/2/2c/Chokladbollar.jpg"),
		createProduct(3, 22, "Brjóstsykur",       499, 200, 4900, ""),
	];
	// Note: sellers 2 and 4 don't have any products - yet!

	var nextProductID = 23;

	// A helper object which emulates the return value
	// from the $http service in Angular.
	var mockHttpPromise = function(condition, data) {
		return {
			success: function(fn) {
				if (condition) {
					fn(data);
				}
				return {
					error: function (f) {
						if (!condition) {
							f();
						}
					}
				};
			}
		};
	};

	var mockResource = {
		// Note: the following properties should NOT be used
		// in production code, but can be used in unit testing
		// code to tell this resource to behave in a certain way!
		successLoadSellers:         true,
		successAddSeller:           true,
		successUpdateSeller:        true,
		successLoadSellerDetails:   true,
		successGetSellerProducts:   true,
		successAddSellerProduct:    true,
		successUpdateSellerProduct: true,

		// Below are the real functions this object should support.
		// The current implementation is of course just a mock
		// implementation, which returns the hardcoded data
		// defined above. A proper implementation will talk to
		// an API to load/save data.
		getSellers: function getSellers() {
			return mockHttpPromise(mockResource.successLoadSellers, mockSellers);
		},

		addSeller: function addSeller(seller) {
			if (mockResource.successAddSeller) {
				seller.id = nextSellerID++;
				seller.numberOfProducts = 0;
				mockSellers.push(seller);
			}
			return mockHttpPromise(mockResource.successAddSeller, seller);
		},

		updateSeller: function(id, seller) {
			if (mockResource.successUpdateSeller) {
				var current = _.find(mockSellers, function(o){ return o.id === id;});
				if (current !== null) {
					current.name      = seller.name;
					current.category  = seller.category;
					current.imagePath = seller.imagePath;
				}
			}
			return mockHttpPromise(mockResource.successUpdateSeller, seller);
		},

		getSellerDetails: function(id) {
			var seller;
			for (var i = 0; i < mockSellers.length; ++i) {
				if (mockSellers[i].id === id) {
					seller = mockSellers[i];
					break;
				}
			}

			if (seller) {
				return mockHttpPromise(mockResource.successLoadSellerDetails, seller);
			} else {
				return mockHttpPromise(false, null);
			}
		},

		getSellerProducts: function getSellerProducts(id) {
			var products = [];
			for (var i = 0; i < mockProducts.length; ++i) {
				if (mockProducts[i].id === id) {
					products.push(mockProducts[i].product);
				}
			}

			return mockHttpPromise(mockResource.successGetSellerProducts, products);
		},

		addSellerProduct: function addSellerProduct(id, product) {
			var success = false;
			if (mockResource.successAddSellerProduct) {
				var seller = _.find(mockSellers, function(o){ return o.id === id;});
				if (seller) {
					success = true;
					product.id = nextProductID++;
					mockProducts.push({
						id: seller.id,
						product: product
					});
					seller.numberOfProducts = seller.numberOfProducts + 1;
				}
			}

			return mockHttpPromise(success, product);
		},

		updateSellerProduct: function updateSellerProduct(id, product) {
			var success = false;
			if (mockResource.successAddSellerProduct) {
				var seller = _.find(mockSellers, function(o){ return o.id === id;});
				if (seller) {
					success = true;
					for (var i = 0; i < mockProducts.length; ++i) {
						if (mockProducts[i].id === id && mockProducts[i].product.id === product.id) {
							mockProducts[i].product = product;
						}
					}
				}
			}

			return mockHttpPromise(success, product);
		}

	};

	return mockResource;
});
