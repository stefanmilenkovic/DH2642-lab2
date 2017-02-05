//ExampleView Object constructor
var DinnerViewController = function (model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.addGuestClicked.attach(function () {
        _this.incrementGuests();
    });

    this._view.delGuestClicked.attach(function () {
        _this.decrementGuests();
    });

    this.incrementGuests = function () {
        console.log("Should add guest");
        this._model.incrementNumberOfGuests();
    };

    this.decrementGuests = function () {
        console.log("Should del guest");
        this._model.decrementNumberOfGuests();
    }
};