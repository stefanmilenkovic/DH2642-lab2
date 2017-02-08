//ExampleView Object constructor
var DishListViewController = function (model, view) {
    this._model = model;
    this._view = view;
    var _this = this;

    //Filter dishes and call view te re-render the list
    this._view.filterButtonClicked.attach(function () {
        var filteredDishes = _this._model.getAllDishesWithFiltering(
            _this._model.getDishFilterType(),
            _this._model.getDishFilterKeywords()
        );
        _this._view.buildDishList(filteredDishes);
    });

    //Initialize views start data
    this._view.buildDishList(_this._model.getAllDishes());
};