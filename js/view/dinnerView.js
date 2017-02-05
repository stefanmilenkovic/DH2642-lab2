var DinnerView = function(model, elements) {

    this._model = model;
    this._elements = elements;

    this.addGuestClicked = new Event(this);
    this.delGuestClicked = new Event(this);

    var _this = this;

    // attach model listeners
    this._model.guestAdded.attach(function () {
        _this.updateNumberOfGuestsValue();
    });
    this._model.guestRemoved.attach(function () {
        _this.updateNumberOfGuestsValue();
    });

    this._elements.addButton.click(function () {
        _this.addGuestClicked.notify();
    });
    this._elements.delButton.click(function () {
        _this.delGuestClicked.notify();
    });


    /**
     * Initialization functions
     */
    this.show = function () {
        this.updateNumberOfGuestsValue();
    };

    this.updateNumberOfGuestsValue = function () {
        this._elements.numberOfGuestsInput.val(this._model.getNumberOfGuests());
    }
};