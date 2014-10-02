angular.module('App', []);


angular.module('App').controller('TableCtrl', function ($scope) {

	$scope.model = {

		columnsDefs: [
			{ id: 'id',              title: '',                 disabled: true                                                                                           },
			{ id: 'name',            title: 'Name',             disabled: true                                                                                           },
			{ id: 'pricePerItem',    title: 'Price per item',   disabled: false,                                                         __relations: ['totalPrice']     },
			{ id: 'itemsCnt',        title: 'Count',            disabled: false,                                                         __relations: ['totalPrice']     },
			{ id: 'totalPrice',      title: 'Total price',      disabled: true,     __formula: 'Math.ceil(#pricePerItem# * #itemsCnt#)'                                  },
			{ id: 'testA',           title: 'A',                disabled: false,    __formula: '#testC# - #testB#',                      __relations: ['testC']          },
			{ id: 'testB',           title: 'B',                disabled: false,    __formula: '#testC# - #testA#',                      __relations: ['testC']          },
			{ id: 'testC',           title: 'C',                disabled: false,    __formula: '#testA# + #testB#',                      __relations: ['testA']          }
		],

		items: [
			[
				{ value: 1 },
				{ value: 'Axes' },
				{ value: 100 },
				{ value: 14 },
				{ value: null },
				{ value: 15 },
				{ value: 20 },
				{ value: null }
			],
			[
				{ value: 2 },
				{ value: 'Bows' },
				{ value: 200 },
				{ value: 10 },
				{ value: null },
				{ value: 30 },
				{ value: 33 },
				{ value: null }
			],
			[
				{ value: 3 },
				{ value: 'Swords' },
				{ value: 500 },
				{ value: 4 },
				{ value: null },
				{ value: 56 },
				{ value: null },
				{ value: 16 }
			]
		]

	};


	for (var i = 0; i < $scope.model.items.length; i++) {
		var row = $scope.model.items[i];

		row._entity = {};

		for (var j = 0; j < row.length; j++) {
			var cell = row[j];

			row._entity[$scope.model.columnsDefs[j].id] = cell;
		}
	}

});


angular.module('App').directive('gridCalculateCell', function () {

	return {
		restrict: 'A',
		scope: {
			item: '=',
			items: '=',
			formula: '=',
			relations: '='
		},

		controller: function($scope) {

			var formula, formulaFields, relationFields;

			if ($scope.formula) {
				formula = angular.copy($scope.formula);
				formulaFields = formula.match(/(#[^\s\+\-\*\/]+#)/g);

				$scope.item.__calculate = function (isInit) {
					if (isInit && $scope.item.value) return;

					var _formula = angular.copy(formula);

					for (var i = 0; i < formulaFields.length; i++) {
						var field = formulaFields[i],
							cellId = field.replace(/#/g, ''),
							value = $scope.items._entity[cellId].value;

						_formula = _formula.replace(field, value || 0);
					}

					$scope.item.value = eval(_formula);
				};

				$scope.item.__calculate(true); // init calculate
			}

			if ($scope.relations) {
				relationFields = $scope.relations;

				$scope.$watch('item.value', function (n, o) {
					if (n && n != o) {

						// calculate relation fields
						for (var i = 0; i < relationFields.length; i++) {
							var cellId = relationFields[i],
								cell = $scope.items._entity[cellId];

							cell.__calculate();
						}
					}
				});
			}

		}
	}

});
