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
        'decrementGuestButton' : $('#decrement-button'),
        'chosenDishesList': $(".chosen-dishes-list"),
        'totalPriceText': $(".total-price-row .total-price-text"),
        'confirmDinnerButton': $("#confirm-dinner-button")
    });
    var dinnerStatusViewController = new DinnerStatusViewController(model, dinnerStatusView);

    var dishListView = new DishListView(model, {
        'dishListViewElement': $("#dish-list-view"),
        'dishListBox' : $("#dish-list-box"),
        'dishSearchButton': $("#dish-search-button"),
        'dishSearchKeyWords': $("#dish-search-key-words"),
        'dishSearchType': $("#dish-search-type")
    });
    var dishListViewController = new DishListViewController(model, dishListView);

    var dishDescriptionView = new DishDesriptionView(model, {
        'dishDescriptionViewElement': $("#dish-description-view"),
        'backToSelectDishButton' : $("#back-to-select-dish-button"),
        'descriptionTitle': $("#dish-description-view .description-title"),
        'descriptionImage': $("#dish-description-view .description-image"),
        'descriptionText': $("#dish-description-view .description-text"),
        'descriptionIngredientsTitle': $("#dish-description-view .description-ingredients-title"),
        'descriptionIngredientsList': $("#dish-description-view .description-ingredients-list"),
        'descriptionDishPrice': $("#dish-description-view .description-dish-price"),
        'descriptionConfirmDishButton': $("#dish-description-view .description-confirm-dish-button")
    });
    var dishDescriptionViewController = new DishDescriptionViewController(model, dishDescriptionView);

    var dinnerOverviewView = new DinnerOverviewView(model, {
        'dinnerOverviewViewElement': $("#dinner-overview-view"),
        'overviewHeaderText': $("#dinner-overview-view .overview-header-text"),
        'goBackAndEditDinnerButton': $("#dinner-overview-view .go-back-and-edit-dinner-button"),
        'overviewDishes': $("#dinner-overview-view .overview-dishes"),
        'dishPriceSum': $("#dinner-overview-view .dish-price-sum"),
        'printFullRecipeButton': $("#dinner-overview-view .print-full-recipe-button")
    });

    var dinnerFullRecipeView = new DinnerFullRecipeView(model, {
        'dinnerFullRecipeViewElement': $("#dinner-full-recipe-view"),
        'overviewHeaderText': $("#dinner-full-recipe-view .overview-header-text"),
        'goBackAndEditDinnerButton': $("#dinner-full-recipe-view .go-back-and-edit-dinner-button"),
        'fullRecipeList': $("#dinner-full-recipe-view .full-recipe-list"),
        'fullRecipefullIngredientsTitle': $("#dinner-full-recipe-view .full-recipe-ingredients-title"),
        'fullRecipeIngredientsList': $("#dinner-full-recipe-view .full-recipe-ingredients-list"),
        'fullRecipeIngredientsTotalPrice': $("#dinner-full-recipe-view .full-recipe-ingredients-total-price")



    });

    var stateController = new StateController(model, startView, dinnerView, dinnerStatusView, dishListView,
        dishDescriptionView, dinnerOverviewView, dinnerFullRecipeView);

});