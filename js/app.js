function Observer(sender) {
    this._sender = sender;
    this._listeners = [];
}

Observer.prototype = {
    attach : function (listener) {
        this._listeners.push(listener);
    },
    notify : function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};

$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var dinnerView = new DinnerView(model, {
        'dinnerViewElement': $("#dinner-view"),
        'showStartPageViewButton': $("#show-start-page-view-button")
    });

    //And create the needed controllers and views
    var startView = new StartView(model, {
        'showStartDinnerViewButton': $("#show-start-dinner-view-button")
    });

    var dinnerStatusView = new DinnerStatusView(model, {
        'dinnerStatusViewElement' : $("#dinner-status-view"),
        'numberOfGuestsInput' : $('#number-of-guests'),
        'incrementGuestButton' : $('#increment-button'),
        'decrementGuestButton' : $('#decrement-button')
    });

    var dishListView = new DishListView(model, {
        'dishListViewElement': $("#dish-list-view"),
        'dishListBox' : $("#dish-list-box"),
        'dishSearchButton': $("#dish-search-button"),
        'dishSearchKeyWords': $("#dish-search-key-words"),
        'dishSearchType': $("#dish-search-type")
    });

    var dishDescriptionView = new DishDesriptionView(model, {
        'dishDescriptionViewElement': $("#dish-description-view"),
        'backToSelectDishButton' : $("#back-to-select-dish-button")
    });

    var dinnerStatusViewController = new DinnerStatusViewController(model, dinnerStatusView);
    var dishListViewController = new DishListViewController(model, dishListView);

    var stateController = new StateController(model, startView, dinnerView, dinnerStatusView, dishListView, dishDescriptionView);

});