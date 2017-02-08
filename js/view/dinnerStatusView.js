var DinnerStatusView = function(model, elements) {

    this._model = model;
    this._elements = elements;

    this.addGuestClicked = new Observer(this);
    this.delGuestClicked = new Observer(this);

    var _this = this;

    // attach model listeners
    this._model.guestAdded.attach(function () {
        _this.updateNumberOfGuestsValue();
    });
    this._model.guestRemoved.attach(function () {
        _this.updateNumberOfGuestsValue();
    });

    this._elements.incrementGuestButton.click(function () {
        _this.addGuestClicked.notify();
    });
    this._elements.decrementGuestButton.click(function () {
        _this.delGuestClicked.notify();
    });

    this.updateNumberOfGuestsValue = function () {
        this._elements.numberOfGuestsInput.val(this._model.getNumberOfGuests());
    };

    this.show = function(){
        this.updateNumberOfGuestsValue();
        this._elements.dinnerStatusViewElement.show();
    };

    this.hide = function(){
        this._elements.dinnerStatusViewElement.hide();
    }

};