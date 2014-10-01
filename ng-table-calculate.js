angular.module('App', []);


angular.module('App').controller('TableCtrl', function ($scope) {

	$scope.model = {

		columnDefs: [
			{ id: 'id',              disabled: true                                                                      },
			{ id: 'name',            title: 'Название',      disabled: true                                              },
			{ id: 'pricePerItem',    title: 'Цена за шт.'                                                                },
			{ id: 'itemsCnt',        title: 'Кол-во'                                                                     },
			{ id: 'totalPrice',      title: 'Цена',          calculate: 'pricePerItem * itemsCnt',   disabled: true      },
			{ id: 'testA',           title: 'A',             calculate: 'testC - testB'                                  },
			{ id: 'testB',           title: 'B',             calculate: 'testC - testA'                                  },
			{ id: 'testC',           title: 'C',             calculate: 'testA + testB'                                  }
		],

		items: [
			[
				{ value: 1 },
				{ value: 'Киянки' },
				{ value: 100 },
				{ value: 14 },
				{ value: null },
				{ value: 15 },
				{ value: 20 },
				{ value: null }
			],
			[
				{ value: 2 },
				{ value: 'Топоры' },
				{ value: 200 },
				{ value: 10 },
				{ value: null },
				{ value: 30 },
				{ value: 33 },
				{ value: null }
			],
			[
				{ value: 3 },
				{ value: 'Арбалеты' },
				{ value: 500 },
				{ value: 4 },
				{ value: null },
				{ value: 56 },
				{ value: null },
				{ value: 16 }
			]
		]

	};

});


angular.module('App').directive('gridCalculateCell', function () {

	return {
		restrict: 'A',

		link: function($scope, $element, $attrs) {



		}
	}

});
