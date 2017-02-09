//ExampleView Object constructor
var DishDescriptionViewController = function (model, view) {
    this._model = model;
    this._view = view;
    var _this = this;

    //Filter dishes and call view te re-render the list
    this._view.confirmDishButtonClicked.attach(function () {
        _this._model.addDishToMenu(_this._model.getCurrentDishId());
        _this._model.setCurrentView(2);
    });
};